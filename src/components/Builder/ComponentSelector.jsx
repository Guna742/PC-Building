import { AnimatePresence, motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import components from '../../data/components';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../data/components';
import ComponentCard from './ComponentCard';
import styles from './ComponentSelector.module.css';

export default function ComponentSelector({ activeCategory }) {
  const { skipComponent, selections, autoFilled } = useBuilder();
  const list = components[activeCategory] || [];
  const current = selections[activeCategory];

  return (
    <div className={styles.selector}>
      {/* Header */}
      <div className={styles.header}>
        <span className={`icon icon-filled ${styles.catIcon}`}>{CATEGORY_ICONS[activeCategory]}</span>
        <div className={styles.catInfo}>
          <h3 className={styles.catTitle}>
            {CATEGORY_LABELS[activeCategory]}
          </h3>
          {current ? (
            <span className={styles.selectedLabel}>
              {autoFilled.has(activeCategory) ? '🤖 Auto-filled: ' : '✓ Selected: '}
              <strong>{current.name}</strong>
            </span>
          ) : (
            <span className={styles.selectedLabel} style={{ color: 'var(--text-muted)' }}>
              No selection — or skip to use default
            </span>
          )}
        </div>
        <button
          className={styles.skipBtn}
          onClick={() => skipComponent(activeCategory)}
          title={`Use default ${CATEGORY_LABELS[activeCategory]}`}
        >
          Use Default
        </button>
      </div>

      {/* Component list */}
      <div className={styles.list}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className={styles.grid}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            {list.map((comp) => (
              <ComponentCard key={comp.id} component={comp} category={activeCategory} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
