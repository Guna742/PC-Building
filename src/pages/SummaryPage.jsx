import { motion } from 'framer-motion';
import Summary from '../components/Summary/Summary';
import { FiShare2, FiShoppingCart, FiPrinter } from 'react-icons/fi';
import styles from './Pages.module.css';

export default function SummaryPage() {
  return (
    <div className={styles.page}>
      <header className={styles.detailHeader}>
        <div className="container">
          <motion.h1 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Build <span className="gradient-text">Manifest</span>
          </motion.h1>
          <p className={styles.sectionSub}>Review, optimize, and finalize your masterpiece.</p>
        </div>
      </header>

      <section className={styles.contentBody}>
        <div className="container">
          <div className={styles.detailGrid}>
            <Summary />
            
            <div className={`glass ${styles.guideCard}`}>
              <h3>Post-Build Guide</h3>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <FiShare2 size={24} style={{ color: 'var(--accent)' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Share Your Setup</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Generate a permanent link to your build to share on Reddit, Discord, or with friends.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '16px' }}>
                  <FiPrinter size={24} style={{ color: 'var(--accent-2)' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Print Component List</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Download a PDF checklist for when you start your physical assembly.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <FiShoppingCart size={24} style={{ color: 'var(--accent-3)' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Price Comparison</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Compare your build price across major retailers (Amazon, Newegg, Microcenter).</p>
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <button className="cta-btn" style={{ width: '100%', background: 'linear-gradient(135deg, var(--accent) 0%, #9333ea 100%)' }}>
                    Order Components Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
