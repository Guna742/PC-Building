import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import { CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from '../../data/components';
import ComponentSelector from './ComponentSelector';
import PCCanvas from '../ThreeCanvas/PCCanvas';
import styles from './Builder.module.css';

function PriceCounter({ price }) {
  return (
    <motion.span
      key={price}
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={styles.priceVal}
    >
      ${price.toLocaleString()}
    </motion.span>
  );
}

export default function Builder() {
  const [activeCategory, setActiveCategory] = useState('cpu');
  const { selections, autoFilled, warnings, totalPrice, totalWattage, finalizeBuild, resetBuild } =
    useBuilder();

  const filledCount = Object.keys(selections).length;
  const progress = (filledCount / CATEGORIES.length) * 100;

  return (
    <section id="builder" className={`section ${styles.section}`}>
      <div className={styles.bgOrb} />

      <div className="container">
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag}>Configure Your Build</span>
          <h2 className={styles.sectionTitle}>
            PC <span className="gradient-text">Builder Studio</span>
          </h2>
          <p className={styles.sectionSub}>
            Choose components category by category. Skip any to auto-fill with a smart default.
          </p>
        </motion.div>

        {/* Warnings */}
        <AnimatePresence>
          {warnings.map((w) => (
            <motion.div
              key={w}
              className={styles.warning}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {w}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressLabel}>
            <span>{filledCount} / {CATEGORIES.length} components selected</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Main builder layout */}
        <div className={styles.builderGrid}>
          {/* Left: Category tabs + selector */}
          <motion.div
            className={`glass ${styles.panel}`}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category tabs */}
            <div className={styles.tabs}>
              {CATEGORIES.map((cat) => {
                const isDone = !!selections[cat];
                const isAuto = autoFilled.has(cat);
                return (
                  <button
                    key={cat}
                    className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ''} ${isDone ? styles.tabDone : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <span className={`icon icon-filled ${styles.tabIcon}`}>{CATEGORY_ICONS[cat]}</span>
                    <span className={styles.tabLabel}>{CATEGORY_LABELS[cat]}</span>
                    {isDone && (
                      <span className={`${styles.tabBadge} ${isAuto ? styles.tabBadgeAuto : ''}`}>
                        <span className="icon" style={{ fontSize: '0.75rem' }}>
                          {isAuto ? 'smart_toy' : 'check'}
                        </span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Component cards */}
            <div className={styles.selectorWrap}>
              <ComponentSelector activeCategory={activeCategory} />
            </div>
          </motion.div>

          {/* Right: 3D Preview */}
          <motion.div
            className={styles.previewPanel}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`glass ${styles.canvasCard}`}>
              <div className={styles.canvasLabel}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="icon icon-filled" style={{ color: 'var(--accent-2)' }}>computer</span>
                  Live 3D Preview
                </span>
                <span className={styles.canvasHint}>Drag to rotate</span>
              </div>
              <div className={styles.canvas}>
                <PCCanvas selections={selections} minimal />
              </div>

              {/* Quick stats */}
              <div className={styles.quickStats}>
                <div className={styles.qStat}>
                  <span className={styles.qVal}>${totalPrice.toLocaleString()}</span>
                  <span className={styles.qLabel}>Estimated Total</span>
                </div>
                <div className={styles.qDivider} />
                <div className={styles.qStat}>
                  <span className={styles.qVal}>{totalWattage}W</span>
                  <span className={styles.qLabel}>Power Draw</span>
                </div>
                <div className={styles.qDivider} />
                <div className={styles.qStat}>
                  <span className={styles.qVal}>{filledCount}/{CATEGORIES.length}</span>
                  <span className={styles.qLabel}>Components</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className={styles.actions}>
              <button className={styles.finalizeBtn} onClick={finalizeBuild}>
                <span className="icon icon-filled">auto_fix_high</span> Auto-Complete Build
              </button>
              <a href="#summary" className={styles.summaryBtn}>
                View Summary
                <span className="icon" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </a>
              <button className={styles.resetBtn} onClick={resetBuild}>
                <span className="icon">restart_alt</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
