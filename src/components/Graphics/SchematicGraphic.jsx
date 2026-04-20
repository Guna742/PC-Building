import { motion } from 'framer-motion';
import { FiCpu, FiTrendingUp, FiActivity, FiZap } from 'react-icons/fi';
import styles from './SchematicGraphic.module.css';

const DATA_POINTS = [
  { label: 'CORE_V', val: '1.24v', color: 'var(--accent)' },
  { label: 'BUS_SPD', val: '100MHz', color: 'var(--accent-2)' },
  { label: 'THM_THR', val: 'SAFE', color: '#22c55e' },
  { label: 'PSU_EFF', val: '94%', color: 'var(--accent-3)' }
];

export default function SchematicGraphic() {
  return (
    <div className={styles.container}>
      {/* Grid Pattern */}
      <div className={styles.gridOverlay} />
      
      {/* Circuit Lines (Animated SVG) */}
      <svg className={styles.svgOverlay} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Decorative Paths */}
        <motion.path 
          d="M 50 50 L 150 50 L 150 150 L 250 150" 
          stroke="rgba(124, 58, 237, 0.2)" 
          strokeWidth="1" 
          fill="none" 
        />
        <motion.path 
          d="M 350 250 L 300 250 L 300 100 L 250 100" 
          stroke="rgba(6, 182, 212, 0.2)" 
          strokeWidth="1" 
          fill="none" 
        />
        
        {/* Animated Data "Bit" */}
        <motion.circle
          r="2"
          fill="var(--accent)"
          animate={{
            offsetDistance: ["0%", "100%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ offsetPath: "path('M 50 50 L 150 50 L 150 150 L 250 150')" }}
        />
      </svg>

      {/* Central Module */}
      <div className={styles.centerModule}>
        <motion.div 
          className={styles.coreOrb}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className={styles.coreInfo}>
          <FiCpu className={styles.coreIcon} />
          <span className={styles.coreLabel}>SYS_LOGIC_V3</span>
        </div>
      </div>

      {/* Floating Data Nodes */}
      <div className={styles.nodesGrid}>
        {DATA_POINTS.map((d, i) => (
          <motion.div 
            key={i} 
            className={styles.node}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className={styles.nodeHeader} style={{ borderColor: d.color }}>
              <span className={styles.nodeLabel}>{d.label}</span>
              <span className={styles.nodeValue} style={{ color: d.color }}>{d.val}</span>
            </div>
            <div className={styles.nodeBar}>
              <motion.div 
                className={styles.nodeFill} 
                style={{ background: d.color }}
                animate={{ width: ['20%', '90%', '40%', '75%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Stream */}
      <div className={styles.bitstream}>
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={i} 
            className={styles.bitLine}
            animate={{ x: [-100, 400] }}
            transition={{ duration: 8, repeat: Infinity, linear: true, delay: i * 2 }}
          >
            01011001 10100111 11001101 00110101
          </motion.div>
        ))}
      </div>
    </div>
  );
}
