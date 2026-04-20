import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Builder', href: '/builder' },
  { label: 'Summary', href: '/summary' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <FiZap className={styles.logoIcon} />
          <span>
            FORGE<span className={styles.logoAccent}>PC</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavLink 
                to={item.href} 
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to="/builder" className={styles.ctaBtn}>
          Build Now
        </Link>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link 
              to="/builder" 
              className={styles.mobileCta} 
              onClick={() => setMenuOpen(false)}
            >
              Build Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
