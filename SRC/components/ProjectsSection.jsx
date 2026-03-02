import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from './ui/Icon.jsx';
import ProjectModal from './ProjectModal.jsx';
import projects from '../data/projects.js';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

function ProjectsSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !gridRef.current || typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-project-card]');

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 10, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.42,
            stagger: 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 84%',
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
    <section id="proyectos" className="section" ref={sectionRef}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className="icon-inline icon-inline--tight">
              <Icon name="Rocket" size="xs" color="accent" />
              <span>PROYECTOS / CASOS</span>
            </span>
          </p>
          <h2 className={styles.title}>Casos reales con enfoque tecnico y comercial</h2>
          <p className={styles.description}>
            Casos seleccionados de producto, freelance y refactor propio, descritos sin inflar
            resultados ni inventar metricas.
          </p>
        </header>

        <div className={styles.grid} ref={gridRef}>
          {projects.map((project) => (
            <article key={project.id} className={`surface-card ${styles.card}`} data-project-card>
              <div className={styles.top}>
                <p className={styles.company}>{project.company}</p>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>

              <ul className={styles.summaryList}>
                <li>{project.problem}</li>
                <li>{project.solution}</li>
              </ul>

              <div className={styles.stack}>
                {project.stack.slice(0, 5).map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>

              <button
                className={styles.detailButton}
                type="button"
                onClick={() => setActiveProject(project)}
                aria-haspopup="dialog"
                aria-label={`Ver caso ${project.title}`}
              >
                <span>Ver caso</span>
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

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

export default ProjectsSection;
