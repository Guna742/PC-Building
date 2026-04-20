import { motion } from 'framer-motion';
import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services'; // Teaser
import { FiCpu, FiCheckCircle, FiLayers } from 'react-icons/fi';
import styles from './Pages.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      
      {/* Expanded Home Content: How it Works */}
      <section className={`section ${styles.guideSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Mastering the <span className="gradient-text">Art of Building</span></h2>
            <p className={styles.sectionSub}>A seamless journey from selection to simulation.</p>
          </div>
          
          <div className={styles.guideGrid}>
            <motion.div 
              className={`glass ${styles.guideCard}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.guideIcon}><FiCpu /></div>
              <h3>1. Personalize</h3>
              <p>Choose from over 3,000 certified components. Our smart filters ensure only compatible parts show up for your specific motherboard and case.</p>
            </motion.div>

            <motion.div 
              className={`glass ${styles.guideCard}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.guideIcon}><FiLayers /></div>
              <h3>2. Visualize</h3>
              <p>Watch your build come to life in a fully interactive 3D space. Rotate, zoom, and inspect every connection before you even touch a screwdriver.</p>
            </motion.div>

            <motion.div 
              className={`glass ${styles.guideCard}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.guideIcon}><FiCheckCircle /></div>
              <h3>3. Validate</h3>
              <p>Our real-time engine calculates TDP, thermal headroom, and physical dimensions to ensure your dream build is safe and efficient.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <div className={styles.teaserBg}>
        <Services />
        <div className={styles.teaserCta}>
          <a href="/features" className="cta-btn secondary">View All Features & Specs</a>
        </div>
      </div>
    </div>
  );
}
