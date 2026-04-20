import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiZap, FiArrowRight } from 'react-icons/fi';
import { SiX, SiInstagram, SiYoutube, SiDiscord } from 'react-icons/si';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  explore: [
    { label: '3D Builder', href: '/builder' },
    { label: 'Features', href: '/features' },
    { label: 'Popular Builds', href: '/' },
    { label: 'Support', href: '/' },
  ],
  company: [
    { label: 'About Us', href: '/' },
    { label: 'Careers', href: '/' },
    { label: 'Privacy Policy', href: '/' },
    { label: 'Terms of Service', href: '/' },
  ],
  social: [
    { icon: <SiX />, label: 'X', href: 'https://twitter.com' },
    { icon: <SiInstagram />, label: 'Instagram', href: 'https://instagram.com' },
    { icon: <SiYoutube />, label: 'YouTube', href: 'https://youtube.com' },
    { icon: <SiDiscord />, label: 'Discord', href: 'https://discord.com' },
  ]
};

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow} />
      
      <motion.div 
        className={`container ${styles.inner}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <div className={styles.topSection}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <FiZap className={styles.logoIcon} />
              <span>FORGE<span className={styles.logoAccent}>PC</span></span>
            </Link>
            <p className={styles.tagline}>
              Engineering the next generation of custom computing. 
              Precision components meet immersive 3D visualization.
            </p>
            <div className={styles.socialRow}>
              {FOOTER_LINKS.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label={s.label}>
                  <div className={styles.socialIcon}>{s.icon}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className={styles.linksGrid}>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Explore</h4>
              {FOOTER_LINKS.explore.map((l) => (
                <Link key={l.label} to={l.href} className={styles.footerLink}>{l.label}</Link>
              ))}
            </div>
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Company</h4>
              {FOOTER_LINKS.company.map((l) => (
                <Link key={l.label} to={l.href} className={styles.footerLink}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className={styles.newsCol}>
            <h4 className={styles.groupTitle}>Stay Updated</h4>
            <p className={styles.newsText}>Get notified about new hardware drops and features.</p>
            <form className={styles.newsForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email address" className={styles.newsInput} />
              <button type="submit" className={styles.newsSubmit} aria-label="Subscribe">
                <FiArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.statusIndicator}>
            <span className={styles.pulseDot} />
            <span className={styles.statusLabel}>All Systems Operational</span>
          </div>
          
          <div className={styles.bottomLinks}>
            <p className={styles.copy}>&copy; 2025 FORGEPC. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link to="/">Privacy Policy</Link>
              <span className={styles.dotSeparator}>&bull;</span>
              <Link to="/">Cookies</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
