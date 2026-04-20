import { motion } from 'framer-motion';
import { FiShield, FiZap, FiBox, FiCpu, FiMonitor, FiActivity } from 'react-icons/fi';
import styles from './Pages.module.css';

const DETAIL_FEATURES = [
  {
    icon: <FiShield />,
    title: "Compatibility Engine",
    desc: "Our proprietary algorithm cross-references socket types, physical clearances (GPU length, CPU cooler height), and power requirements in real-time. No more 'will it fit?' anxiety."
  },
  {
    icon: <FiZap />,
    title: "Precision Wattage",
    desc: "We don't just estimate. We calculate the peak transient loads of modern hardware like RTX 40-series cards and high-TDP CPUs to recommend the perfect 80+ rated PSU for your build."
  },
  {
    icon: <FiBox />,
    title: "VIRTUAL-3D Render",
    desc: "Utilizing WebGL 2.0 and Three.js, we provide a mathematically accurate representation of your hardware. Each part is modeled with textures derived from high-res photography."
  }
];

export default function Features() {
  return (
    <div className={styles.page}>
      <header className={styles.detailHeader}>
        <div className="container">
          <motion.h1 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Advanced <span className="gradient-text">Feature Suite</span>
          </motion.h1>
          <p className={styles.sectionSub}>The technology behind the world's most accurate PC builder.</p>
        </div>
      </header>

      <section className={styles.contentBody}>
        <div className="container">
          <div className={styles.detailGrid}>
            <div>
              <h2 className={styles.sectionTitle} style={{ fontSize: '1.8rem', textAlign: 'left' }}>
                Why Our Builder is <span style={{ color: 'var(--accent)' }}>Different</span>
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '24px' }}>
                {DETAIL_FEATURES.map((f, i) => (
                  <motion.li 
                    key={i} 
                    style={{ marginBottom: '32px' }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div className={styles.highlightIcon} style={{ fontSize: '1.5rem' }}>{f.icon}</div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{f.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div 
              className={styles.detailImage}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* This would ideally be an image or a mini 3D canvas */}
              <div style={{ padding: '40px', color: 'var(--text-muted)' }}>
                [ High-Performance Schematic Visualization Overload ]
                <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <FiCpu size={40} /> <FiMonitor size={40} /> <FiActivity size={40} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
