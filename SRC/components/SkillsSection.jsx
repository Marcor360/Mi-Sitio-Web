import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from './ui/Icon.jsx';
import SkillItem from './SkillItem.jsx';
import { levelLegend, skills } from '../data/skills.js';
import styles from './SkillsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'Frontend', label: 'Frontend' },
  { id: 'UI/Data', label: 'UI/Data' },
  { id: 'Performance/SEO', label: 'Performance / SEO' },
  { id: 'Analytics', label: 'Analytics' },
  { id: 'Backend', label: 'Backend' },
  { id: 'Tooling', label: 'Tooling' },
  { id: 'Ops', label: 'Ops' },
];

const PANEL_CONFIG = [
  {
    id: 'product',
    title: 'Producto y experiencia de usuario',
    description: 'UI, datos, performance y medicion con foco en entregables reales.',
    icon: 'Code',
    categories: ['Frontend', 'UI/Data', 'Performance/SEO', 'Analytics'],
  },
  {
    id: 'delivery',
    title: 'Integracion, entrega y operacion',
    description: 'Back-end de apoyo, tooling y criterio operativo para continuidad.',
    icon: 'Wrench',
    categories: ['Backend', 'Tooling', 'Ops'],
  },
];

const ALL_CATEGORIES = [...new Set(skills.map((item) => item.category))];

function SkillsSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(ALL_CATEGORIES);
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  useEffect(() => {
    setActiveTooltipId(null);
  }, [showDetails]);

  const visibleSkills =
    activeFilter === 'all'
      ? skills
      : skills.filter((item) => item.category === activeFilter);

  const groupedSkills = visibleSkills.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }

    groups[item.category].push(item);
    return groups;
  }, {});

  const visibleCategories = Object.keys(groupedSkills);

  useEffect(() => {
    setExpandedCategories((current) => {
      const next = new Set(current);
      visibleCategories.forEach((category) => next.add(category));
      return Array.from(next);
    });
    setActiveTooltipId(null);
  }, [activeFilter]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current || typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const rows = gsap.utils.toArray('[data-skill-row]');
      const activeSegments = gsap.utils.toArray('[data-meter-filled="true"]');

      if (rows.length === 0) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      timeline.fromTo(
        rows,
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.34, stagger: 0.03, ease: 'power2.out' }
      );

      if (activeSegments.length > 0) {
        timeline.fromTo(
          activeSegments,
          { scaleX: 0.3, autoAlpha: 0.24 },
          { scaleX: 1, autoAlpha: 1, duration: 0.22, stagger: 0.008, ease: 'power2.out' },
          0.05
        );
      }
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, [activeFilter]);

  const toggleCategory = (category) => {
    setExpandedCategories((current) => {
      const next = new Set(current);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return Array.from(next);
    });
  };

  const renderCategory = (category) => {
    const categorySkills = groupedSkills[category];

    if (!categorySkills?.length) {
      return null;
    }

    const isExpanded = expandedCategories.includes(category);

    return (
      <section key={category} className={styles.category}>
        <button
          className={styles.categoryToggle}
          type="button"
          aria-expanded={isExpanded}
          onClick={() => toggleCategory(category)}
        >
          <span>{category}</span>
          <span className={styles.categoryCount}>{categorySkills.length}</span>
        </button>

        <div
          className={`${styles.categoryBody} ${isExpanded ? styles.categoryBodyExpanded : ''}`}
        >
          <div className={styles.skillList}>
            {categorySkills.map((skill) => (
              <SkillItem
                key={skill.id}
                skill={skill}
                showDetails={showDetails}
                tooltipOpen={activeTooltipId === skill.id}
                onToggleTooltip={(id) =>
                  setActiveTooltipId((current) => (current === id ? null : id))
                }
                onCloseTooltip={() => setActiveTooltipId(null)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <section id="habilidades" className="section" ref={sectionRef}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className="icon-inline icon-inline--tight">
              <Icon name="Code" size="xs" color="accent" />
              <span>HABILIDADES</span>
            </span>
          </p>
          <h2 className={styles.title}>Habilidades con nivel real, contexto y evidencia</h2>
          <p className={styles.description}>
            Se reemplaza el porcentaje arbitrario por una escala creible de 1 a 5,
            basada en uso real, responsabilidades y credenciales.
          </p>
        </header>

        <div className={styles.legendBlock}>
          <div className={styles.legend} aria-label="Leyenda de niveles">
            {levelLegend.map((item) => (
              <span key={item.value} className={styles.legendItem}>
                <strong>{item.value}</strong> {item.label}
              </span>
            ))}
          </div>
          <p className={styles.legendCopy}>
            Niveles basados en uso real en proyectos y responsabilidades.
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters} role="group" aria-label="Filtrar habilidades">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                className={`${styles.filterButton} ${
                  activeFilter === filter.id ? styles.filterButtonActive : ''
                }`}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <button
            className={`${styles.detailToggle} ${
              showDetails ? styles.detailToggleActive : ''
            }`}
            type="button"
            aria-pressed={showDetails}
            onClick={() => setShowDetails((current) => !current)}
          >
            {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
          </button>
        </div>

        <div className={styles.panelGrid} ref={contentRef}>
          {PANEL_CONFIG.map((panel) => {
            const hasVisibleCategory = panel.categories.some((category) =>
              visibleCategories.includes(category)
            );

            if (!hasVisibleCategory) {
              return null;
            }

            return (
              <article key={panel.id} className={`surface-card ${styles.panel}`}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelTitleGroup}>
                    <p className={styles.panelEyebrow}>
                      <span className="icon-inline icon-inline--tight">
                        <Icon name={panel.icon} size="xs" color="accent" />
                        <span>{panel.title}</span>
                      </span>
                    </p>
                    <p className={styles.panelDescription}>{panel.description}</p>
                  </div>
                </div>

                <div className={styles.panelBody}>
                  {panel.categories.map((category) => renderCategory(category))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
