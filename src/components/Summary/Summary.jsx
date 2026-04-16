import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import { CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from '../../data/components';
import styles from './Summary.module.css';

function AnimatedPrice({ price }) {
  return (
    <motion.span
      key={price}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
    >
      ${price.toLocaleString()}
    </motion.span>
  );
}

export default function Summary() {
  const {
    selections,
    autoFilled,
    totalPrice,
    totalWattage,
    finalizeBuild,
    resetBuild,
    exportBuild,
  } = useBuilder();

  const hasSelections = Object.keys(selections).length > 0;
  const autoCount = autoFilled.size;
  const manualCount = Object.keys(selections).length - autoCount;

  return (
    <section id="summary" className={`section ${styles.section}`}>
      <div className={styles.bgOrb} />

      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag}>Build Summary</span>
          <h2 className={styles.sectionTitle}>
            Your <span className="gradient-text">Complete Build</span>
          </h2>
          <p className={styles.sectionSub}>
            Review every component, see what was auto-filled, and export your spec.
          </p>
        </motion.div>

        {!hasSelections ? (
          <motion.div
            className={styles.empty}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className={`icon icon-filled ${styles.emptyIcon}`}>computer</span>
            <h3>No Components Selected Yet</h3>
            <p>Head up to the Builder Studio and start configuring your dream PC.</p>
            <a href="#builder" className={styles.emptyBtn}>
              Go to Builder
              <span className="icon" style={{ fontSize: '1rem' }}>arrow_forward</span>
            </a>
          </motion.div>
        ) : (
          <div className={styles.layout}>
            {/* Components table */}
            <motion.div
              className={`glass ${styles.tableCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.tableHeader}>
                <span>Component</span>
                <span>Selection</span>
                <span>Status</span>
                <span>Price</span>
              </div>

              {CATEGORIES.map((cat, i) => {
                const item = selections[cat];
                const isAuto = autoFilled.has(cat);
                return (
                  <motion.div
                    key={cat}
                    className={`${styles.tableRow} ${!item ? styles.rowEmpty : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <div className={styles.catCell}>
                      <span className={`icon icon-filled ${styles.rowIcon}`}>{CATEGORY_ICONS[cat]}</span>
                      <span className={styles.catName}>{CATEGORY_LABELS[cat]}</span>
                    </div>
                    <div className={styles.nameCell}>
                      {item ? (
                        <span>{item.name}</span>
                      ) : (
                        <span className={styles.notSelected}>Not selected</span>
                      )}
                    </div>
                    <div>
                      {item && (
                        <span className={`${styles.badge} ${isAuto ? styles.badgeAuto : styles.badgeManual}`}>
                          <span className="icon" style={{ fontSize: '0.75rem' }}>
                            {isAuto ? 'smart_toy' : 'check_circle'}
                          </span>
                          {isAuto ? ' Auto' : ' Manual'}
                        </span>
                      )}
                    </div>
                    <div className={styles.priceCell}>
                      {item ? `$${item.price}` : '—'}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right: totals + actions */}
            <div className={styles.sidebar}>
              {/* Total price card */}
              <motion.div
                className={`glass ${styles.totalCard}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className={styles.totalLabel}>Total Build Cost</p>
                <div className={styles.totalPrice}>
                  <AnimatedPrice price={totalPrice} />
                </div>

                <div className={styles.breakdown}>
                  <div className={styles.breakRow}>
                    <span>Manual picks</span>
                    <span>{manualCount}</span>
                  </div>
                  <div className={styles.breakRow}>
                    <span>Auto-filled</span>
                    <span>{autoCount}</span>
                  </div>
                  <div className={styles.breakRow}>
                    <span>Est. Power Draw</span>
                    <span>{totalWattage}W</span>
                  </div>
                </div>

                <div className={styles.divider} />

                {/* Rating */}
                <div className={styles.rating}>
                  <span className={styles.ratingLabel}>Build Tier</span>
                  <span className={styles.ratingVal}>
                    {totalPrice >= 2000 ? (
                      <><span className="icon icon-filled" style={{ color: '#ef4444' }}>local_fire_department</span> Extreme</>
                    ) : totalPrice >= 1200 ? (
                      <><span className="icon icon-filled" style={{ color: '#06b6d4' }}>bolt</span> High-End</>
                    ) : totalPrice >= 700 ? (
                      <><span className="icon icon-filled" style={{ color: '#7c3aed' }}>sports_esports</span> Mid-Range</>
                    ) : (
                      <><span className="icon icon-filled" style={{ color: '#f59e0b' }}>savings</span> Budget</>
                    )}
                  </span>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                className={styles.actions}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button className={styles.exportBtn} onClick={exportBuild}>
                  <span className="icon icon-filled">upload</span> Export Build JSON
                </button>
                <button className={styles.autoBtn} onClick={finalizeBuild}>
                  <span className="icon icon-filled">auto_fix_high</span> Auto-Complete Missing
                </button>
                <button className={styles.resetBtn} onClick={resetBuild}>
                  <span className="icon">restart_alt</span> Start Over
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
