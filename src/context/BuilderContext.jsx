import { createContext, useContext, useState, useCallback } from 'react';
import components, { CATEGORIES, SOCKET_COMPAT } from '../data/components';

const BuilderContext = createContext(null);

export function BuilderProvider({ children }) {
  const [selections, setSelections] = useState({});
  const [autoFilled, setAutoFilled] = useState(new Set());
  const [warnings, setWarnings] = useState([]);

  const getDefault = useCallback((category) => {
    return components[category].find((c) => c.isDefault) || components[category][0];
  }, []);

  const totalPrice = Object.values(selections).reduce((sum, item) => sum + (item?.price || 0), 0);

  const totalWattage = Object.values(selections)
    .filter((item) => item && item.wattage)
    .reduce((sum, item) => {
      if (item.category === 'psu') return sum;
      return sum + item.wattage;
    }, 0);

  const selectComponent = useCallback(
    (category, component) => {
      const newSelections = { ...selections, [category]: { ...component, category } };
      const newWarnings = [];

      // Compatibility check: CPU ↔ Motherboard
      if (category === 'cpu' && newSelections.motherboard) {
        const cpuSocket = component.socket;
        const mbSocket = newSelections.motherboard.socket;
        if (cpuSocket && mbSocket && !SOCKET_COMPAT[cpuSocket]?.includes(mbSocket)) {
          // Auto-switch motherboard
          const compatMb = components.motherboard.find(
            (mb) => mb.socket === cpuSocket
          );
          if (compatMb) {
            newSelections.motherboard = { ...compatMb, category: 'motherboard' };
            newWarnings.push(
              `Motherboard switched to ${compatMb.name} for ${cpuSocket} compatibility.`
            );
          }
        }
      }

      if (category === 'motherboard' && newSelections.cpu) {
        const cpuSocket = newSelections.cpu.socket;
        const mbSocket = component.socket;
        if (cpuSocket && mbSocket && !SOCKET_COMPAT[cpuSocket]?.includes(mbSocket)) {
          newWarnings.push(
            `⚠️ ${component.name} (${mbSocket}) is incompatible with ${newSelections.cpu.name} (${cpuSocket}). Consider changing your CPU or motherboard.`
          );
        }
      }

      setWarnings(newWarnings);
      setSelections(newSelections);

      // Remove from autoFilled if manually selected
      setAutoFilled((prev) => {
        const next = new Set(prev);
        next.delete(category);
        return next;
      });
    },
    [selections]
  );

  const skipComponent = useCallback(
    (category) => {
      const defaultComp = getDefault(category);
      setSelections((prev) => ({ ...prev, [category]: { ...defaultComp, category } }));
      setAutoFilled((prev) => new Set([...prev, category]));
    },
    [getDefault]
  );

  const finalizeBuild = useCallback(() => {
    const filled = { ...selections };
    const newAutoFilled = new Set(autoFilled);

    CATEGORIES.forEach((cat) => {
      if (!filled[cat]) {
        const def = getDefault(cat);
        filled[cat] = { ...def, category: cat };
        newAutoFilled.add(cat);
      }
    });

    // Ensure CPU-MB compatibility after fill
    if (filled.cpu && filled.motherboard) {
      const cpuSocket = filled.cpu.socket;
      const mbSocket = filled.motherboard.socket;
      if (cpuSocket && mbSocket && !SOCKET_COMPAT[cpuSocket]?.includes(mbSocket)) {
        const compatMb = components.motherboard.find((mb) => mb.socket === cpuSocket);
        if (compatMb) {
          filled.motherboard = { ...compatMb, category: 'motherboard' };
          newAutoFilled.add('motherboard');
        }
      }
    }

    setSelections(filled);
    setAutoFilled(newAutoFilled);
  }, [selections, autoFilled, getDefault]);

  const resetBuild = useCallback(() => {
    setSelections({});
    setAutoFilled(new Set());
    setWarnings([]);
  }, []);

  const exportBuild = useCallback(() => {
    const build = {
      timestamp: new Date().toISOString(),
      totalPrice,
      components: Object.entries(selections).map(([cat, item]) => ({
        category: cat,
        ...item,
        autoFilled: autoFilled.has(cat),
      })),
    };
    const blob = new Blob([JSON.stringify(build, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-pc-build.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [selections, autoFilled, totalPrice]);

  return (
    <BuilderContext.Provider
      value={{
        selections,
        autoFilled,
        warnings,
        totalPrice,
        totalWattage,
        selectComponent,
        skipComponent,
        finalizeBuild,
        resetBuild,
        exportBuild,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error('useBuilder must be used inside BuilderProvider');
  return ctx;
}
