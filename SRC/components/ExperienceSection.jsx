import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from './SectionHeading.jsx';
import ExperienceModal from './ExperienceModal.jsx';
import Icon from './ui/Icon.jsx';
import experienceItems from '../data/experience.js';
import styles from './ExperienceSection.module.css';

gsap.registerPlugin(ScrollTrigger);

function ExperienceSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeExperience, setActiveExperience] = useState(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !gridRef.current || typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-exp-card]');

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 10, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section id="experiencia" className="section" ref={sectionRef}>
      <div className="container">
        <SectionHeading
          eyebrow="Experiencia"
          iconName="Briefcase"
          title="Experiencia profesional orientada a ejecucion"
          description="Roles recientes en producto, e-commerce, proyectos a medida y soporte, ordenados por impacto y actualidad."
        />

        <div className={styles.grid} ref={gridRef}>
          {experienceItems.map((item, index) => (
            <article
              key={item.id}
              className={`surface-card ${styles.card}`}
              data-exp-card
            >
              <span className={styles.kicker}>{String(index + 1).padStart(2, '0')}</span>

              <div className={styles.head}>
                <h3 className={styles.title}>
                  <span className="icon-inline icon-inline--tight">
                    <Icon name="Briefcase" size="sm" color="accent" />
                    <span>{item.role}</span>
                  </span>
                </h3>
                <p className={styles.company}>{item.company}</p>
                <p className={styles.dateRange}>{item.dateRange}</p>
              </div>

              <p className={styles.summary}>{item.summary}</p>

              <ul className={styles.bulletPreview} aria-label={`Resumen de ${item.role}`}>
                {item.bullets.slice(0, 2).map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className={styles.tags}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className={styles.detailButton}
                type="button"
                onClick={() => setActiveExperience(item)}
                aria-haspopup="dialog"
                aria-label={`Ver detalle de ${item.role} en ${item.company}`}
              >
                <span>Ver detalle</span>
                <Icon
                  name="ExternalLink"
                  size="sm"
                  color="secondary"
                  className="icon--interactive icon--trailing"
                />
              </button>
            </article>
          ))}
        </div>
      </div>

      <ExperienceModal experience={activeExperience} onClose={() => setActiveExperience(null)} />
    </section>
  );
}

export default ExperienceSection;
