import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CredentialModal from './CredentialModal.jsx';
import Icon from './ui/Icon.jsx';
import { analytics } from '../lib/analytics.js';
import credentials from '../data/credentials.js';
import styles from './CertificationsSection.module.css';

const FILTERS = [
  { id: 'all', label: 'Todas' },
  { id: 'ai-data', label: 'IA & Data' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'webdev', label: 'Web Dev' },
  { id: 'security', label: 'Seguridad' },
];

const AI_APPLIED_ITEMS = [
  {
    id: 'prompting',
    title: 'Prompting para productividad',
    copy: 'Documentacion, variantes de copy, QA rapido y checklists con criterio humano.',
    icon: 'Cpu',
  },
  {
    id: 'measurement',
    title: 'Medicion y decision',
    copy: 'GA4 events y conversiones, embudos y debugging de tracking para tomar mejores decisiones.',
    icon: 'BarChart',
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI',
    copy: 'Uso responsable, sesgos, validacion basica y AI-ready sin prometer ML avanzado.',
    icon: 'Shield',
  },
];

gsap.registerPlugin(ScrollTrigger);

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Cloud':
      return 'Globe';
    case 'WebDev':
      return 'Code';
    case 'Security':
      return 'Shield';
    case 'Data':
      return 'BarChart';
    case 'AI':
    default:
      return 'Cpu';
  }
};

const getApplicationText = (credential) => {
  switch (credential.category) {
    case 'Cloud':
      return 'Aplica para documentar decisiones, revisar riesgos y mantener criterio al usar herramientas cloud con IA.';
    case 'WebDev':
      return 'Refuerza bases que luego aterrizo en interfaces, integraciones, formularios y mantenimiento de sitios reales.';
    case 'Security':
      return 'Se traduce en mejores practicas, hardening basico y una lectura mas critica de riesgos comunes.';
    case 'Data':
      return 'Lo uso para leer mejor mediciones, ordenar hallazgos y conectar analitica con decisiones tecnicas.';
    case 'AI':
    default:
      return 'Se aterriza en prompting, QA, documentacion asistida y validacion responsable de resultados antes de usar IA.';
  }
};

const matchesFilter = (credential, filterId) => {
  switch (filterId) {
    case 'ai-data':
      return credential.category === 'AI' || credential.category === 'Data';
    case 'cloud':
      return credential.category === 'Cloud';
    case 'webdev':
      return credential.category === 'WebDev';
    case 'security':
      return credential.category === 'Security';
    case 'all':
    default:
      return true;
  }
};

function CertificationsSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCredential, setActiveCredential] = useState(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !gridRef.current || typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-credential-card]');

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 10, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.44,
            stagger: 0.06,
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

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredCredentials = credentials.filter((item) => {
    if (!matchesFilter(item, activeFilter)) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const searchHaystack = [item.title, item.issuer, ...item.skills].join(' ').toLowerCase();
    return searchHaystack.includes(normalizedSearch);
  });

  return (
    <section id="certificaciones" className="section" ref={sectionRef}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className="icon-inline icon-inline--tight">
              <Icon name="CheckCircle" size="xs" color="accent" />
              <span>CERTIFICACIONES</span>
            </span>
          </p>
          <h2 className={styles.title}>Certificaciones y credenciales verificables</h2>
          <p className={styles.description}>
            Credenciales seleccionadas (IA, Web Dev, Cloud y seguridad). Filtros y
            enlaces de verificacion.
          </p>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filtrar credenciales">
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

          <label className={styles.searchField}>
            <span className={styles.searchLabel}>Buscar</span>
            <input
              className={styles.searchInput}
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar credencial..."
            />
          </label>
        </div>

        {filteredCredentials.length > 0 ? (
          <div className={styles.grid} ref={gridRef}>
            {filteredCredentials.map((item) => {
              const visibleSkills = item.skills.slice(0, 4);
              const hiddenSkills = item.skills.length - visibleSkills.length;

              return (
                <article
                  key={item.id}
                  className={`surface-card ${styles.card}`}
                  data-credential-card
                >
                  <div className={styles.cardTop}>
                    <p className={styles.issuer}>{item.issuer}</p>
                    <span className={styles.date}>{item.date}</span>
                  </div>

                  <h3 className={styles.cardTitle}>
                    <span className="icon-inline icon-inline--tight">
                      <Icon name={getCategoryIcon(item.category)} size="sm" color="accent" />
                      <span>{item.title}</span>
                    </span>
                  </h3>

                  <p className={styles.summary}>{item.summary}</p>

                  <div className={styles.skills} aria-label={`Skills de ${item.title}`}>
                    {visibleSkills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                    {hiddenSkills > 0 ? <span className="tag">+{hiddenSkills}</span> : null}
                  </div>

                  <div className={styles.footer}>
                    <div className={styles.metaBlock}>
                      {item.credentialId ? (
                        <p className={styles.credentialId}>ID: {item.credentialId}</p>
                      ) : (
                        <p className={styles.credentialIdMuted}>ID no publico</p>
                      )}
                    </div>

                    <div className={styles.actions}>
                      <button
                        className={styles.detailButton}
                        type="button"
                        onClick={() => setActiveCredential(item)}
                        aria-haspopup="dialog"
                        aria-label={`Ver detalles de ${item.title}`}
                      >
                        Ver detalles
                      </button>

                      {item.url ? (
                        <a
                          className={styles.linkButton}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => {
                            event.stopPropagation();
                            analytics.track('outbound_link', {
                              section: 'certs',
                              label: item.id,
                              url: item.url,
                            });
                          }}
                        >
                          <span>Ver credencial</span>
                          <Icon
                            name="ExternalLink"
                            size="sm"
                            color="secondary"
                            className="icon--interactive icon--trailing"
                          />
                        </a>
                      ) : (
                        <span className={styles.tooltip} title="Enlace no disponible">
                          <button className={styles.linkButtonDisabled} type="button" disabled>
                            <span>Sin enlace publico</span>
                            <Icon
                              name="ExternalLink"
                              size="sm"
                              color="muted"
                              className="icon--trailing"
                            />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={`surface-card ${styles.emptyState}`}>
            <p className={styles.emptyTitle}>Sin coincidencias</p>
            <p className={styles.emptyCopy}>
              Ajusta el filtro o cambia la busqueda para mostrar otras credenciales.
            </p>
          </div>
        )}

        <div className={`surface-card ${styles.aiBlock}`}>
          <div className={styles.aiHeader}>
            <p className={styles.aiEyebrow}>AI-ready</p>
            <h3 className={styles.aiTitle}>IA aplicada (sin humo)</h3>
            <p className={styles.aiDescription}>
              Uso IA como apoyo para productividad, analitica y criterio. No afirmo
              entrenamiento de modelos ni ML avanzado.
            </p>
          </div>

          <div className={styles.aiGrid}>
            {AI_APPLIED_ITEMS.map((item) => (
              <article key={item.id} className={styles.aiCard}>
                <h4 className={styles.aiCardTitle}>
                  <span className="icon-inline icon-inline--tight">
                    <Icon name={item.icon} size="sm" color="accent" />
                    <span>{item.title}</span>
                  </span>
                </h4>
                <p className={styles.aiCardCopy}>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <CredentialModal
        credential={activeCredential}
        applicationText={activeCredential ? getApplicationText(activeCredential) : ''}
        onClose={() => setActiveCredential(null)}
      />
    </section>
  );
}

export default CertificationsSection;
