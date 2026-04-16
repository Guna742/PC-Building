import { motion } from 'framer-motion';
import useTilt from '../../hooks/useTilt';
import styles from './Services.module.css';

const SERVICES = [
  {
    icon: 'build',
    title: 'Custom Builds',
    description:
      'Craft a fully personalized PC tailored to your workload — gaming, streaming, 3D rendering, or AI development.',
    color: '#7c3aed',
    tags: ['Gaming', 'Workstation', 'AI Rig'],
  },
  {
    icon: 'speed',
    title: 'Performance Tuning',
    description:
      'Automatically calculated wattage budgets, thermal headroom analysis, and bottleneck detection for your build.',
    color: '#06b6d4',
    tags: ['Overclocking', 'Cooling', 'Benchmarks'],
  },
  {
    icon: 'extension',
    title: 'Parts Advisor',
    description:
      'Smart compatibility matrix ensures every selected component works in harmony — no more socket mismatches.',
    color: '#f59e0b',
    tags: ['CPU+MB', 'DDR5', 'PCIe 5.0'],
  },
  {
    icon: 'verified_user',
    title: 'Build Warranty',
    description:
      'Export your full build spec as a JSON manifest, shareable with any vendor or builder for hassle-free ordering.',
    color: '#ec4899',
    tags: ['Export', 'JSON', 'Shareable'],
  },
];

function ServiceCard({ service, index }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(10);

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-color': service.color }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
      <div className={styles.cardGlow} />
      <div className={styles.iconWrap}>
        <span className={`icon icon-filled ${styles.icon}`}>{service.icon}</span>
      </div>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.description}</p>
      <div className={styles.tags}>
        {service.tags.map((t) => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>
      <div className={styles.cardLine} />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className={`section ${styles.services}`}>
      {/* Background orb */}
      <div className={styles.bgOrb} />

      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag}>Why Choose ForgPC</span>
          <h2 className={styles.sectionTitle}>
            Everything You Need to
            <span className="gradient-text"> Build Smart</span>
          </h2>
          <p className={styles.sectionSub}>
            From intelligent compatibility checks to immersive 3D previews — we make PC building
            intuitive and exciting.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
