import { motion } from 'framer-motion';
import { useBuilder } from '../../context/BuilderContext';
import styles from './ComponentCard.module.css';

export default function ComponentCard({ component, category }) {
  const { selections, selectComponent } = useBuilder();
  const isSelected = selections[category]?.id === component.id;

  return (
    <motion.div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      style={{ '--comp-color': component.color || '#7c3aed' }}
      onClick={() => selectComponent(category, component)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      layout
    >
      {isSelected && <div className={styles.selectedGlow} />}

      <div className={styles.top}>
        <span className={styles.brand}>{component.brand}</span>
        {isSelected && <span className={styles.check}>✓</span>}
      </div>

      <h4 className={styles.name}>{component.name}</h4>
      <p className={styles.specs}>{component.specs}</p>

      <div className={styles.footer}>
        <span className={styles.price}>${component.price}</span>
        {component.wattage > 0 && component.wattage < 500 && (
          <span className={styles.watt}>{component.wattage}W</span>
        )}
      </div>
    </motion.div>
  );
}
