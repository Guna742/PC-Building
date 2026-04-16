import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚡ FORGE<span>PC</span></span>
          <p>Build your dream machine with smart compatibility, live 3D preview, and real-time pricing.</p>
        </div>
        <div className={styles.links}>
          <a href="#hero">Home</a>
          <a href="#services">Features</a>
          <a href="#builder">Builder</a>
          <a href="#summary">Summary</a>
        </div>
        <p className={styles.copy}>© 2025 ForgePC. Built with React + Three.js.</p>
      </div>
    </footer>
  );
}
