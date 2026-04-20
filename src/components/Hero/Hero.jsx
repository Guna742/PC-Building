import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCpu, FiShield, FiBox, FiArrowRight } from 'react-icons/fi';
import { useBuilder } from '../../context/BuilderContext';
import PCCanvas from '../ThreeCanvas/PCCanvas';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

const BADGE_ITEMS = [
  { icon: <FiCpu />, label: 'Next-Gen Performance' },
  { icon: <FiShield />, label: 'Smart Compatibility' },
  { icon: <FiBox />, label: 'Live 3D Preview' },
];

export default function Hero() {
  const { selections } = useBuilder();
  const orb1Ref = useRef();
  const orb2Ref = useRef();

  useEffect(() => {
    // Orb float animations
    gsap.to(orb1Ref.current, {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    gsap.to(orb2Ref.current, {
      y: 25,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1,
    });
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Glow orbs */}
      <div className={styles.orb1} ref={orb1Ref} />
      <div className={styles.orb2} ref={orb2Ref} />

      <div className={`container ${styles.content}`}>
        {/* Left: Text */}
        <div className={styles.textSide}>
          {/* Badge row */}
          <motion.div
            className={styles.badges}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {BADGE_ITEMS.map((b) => (
              <span key={b.label} className={styles.badge}>
                 <span className={styles.badgeIcon}>{b.icon}</span>
                 {b.label}
              </span>
            ))}
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Build Your
            <span className="gradient-text"> Dream PC</span>
            <br />in Real‑Time 3D
          </motion.h1>

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Select components, watch your build come alive in 3D, and get smart
            compatibility checks — all in one seamless experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <Link to="/builder" className={styles.ctaPrimary}>
              <span>Start Building</span>
              <FiArrowRight className={styles.btnArrow} />
            </Link>
            <Link to="/features" className={styles.ctaSecondary}>
              Learn More
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {[
              { val: '30+', label: 'Components' },
              { val: '100%', label: 'Compatibility' },
              { val: '3D', label: 'Live Preview' },
            ].map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statVal}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Canvas */}
        <motion.div
          className={styles.canvasSide}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          <div className={styles.canvasGlow} />
          <div className={styles.canvasWrap}>
            <PCCanvas selections={selections} />
          </div>
          <p className={styles.canvasHint}>↻ Drag to rotate</p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
