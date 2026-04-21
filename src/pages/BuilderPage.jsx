import { motion } from 'framer-motion';
import Builder from '../components/Builder/Builder';
import { FiInfo, FiTrendingUp, FiZap } from 'react-icons/fi';
import styles from './Pages.module.css';

export default function BuilderPage() {
  return (
    <div className={styles.page}>
      <header className={styles.detailHeader} style={{ paddingBottom: '20px' }}>
        <div className="container">
          <motion.h1 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PC <span className="gradient-text">Architect</span>
          </motion.h1>
          <p className={styles.sectionSub}>Precision selection, intelligent logic.</p>
        </div>
      </header>

      <section className={styles.contentBody}>
        <div className="container">
          <div className={styles.pageGrid}>
            <Builder />
            
            {/* Sidebar Guide */}
            <aside className={styles.sidebar}>
              <div className={`glass ${styles.guideCard}`} style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiInfo className={styles.highlightIcon} /> Pro Tips
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <FiTrendingUp style={{ color: 'var(--accent-2)', marginRight: '6px' }} />
                    <b>Bottleneck Check:</b> Ensure your CPU and GPU generation are balanced to avoid performance throttling.
                  </li>
                  <li style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <FiZap style={{ color: 'var(--accent)', marginRight: '6px' }} />
                    <b>Memory Speed:</b> For modern DDR5 builds, aim for 6000MHz CL30 for the sweet spot.
                  </li>
                </ul>
              </div>

              <div className={`glass ${styles.guideCard}`} style={{ padding: '24px', marginTop: '20px' }}>
                 <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Need Help?</h3>
                 <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                   Our engineers are available for live consultation if you're stuck on a complex build.
                 </p>
                 <button className="cta-btn secondary" style={{ fontSize: '0.75rem', padding: '8px 16px', marginTop: '12px', width: '100%' }}>
                   Chat with an Expert
                 </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
