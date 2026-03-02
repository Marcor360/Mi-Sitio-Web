import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from './ui/Icon.jsx';
import { analytics } from '../lib/analytics.js';
import styles from './Hero.module.css';
import heroPortrait from '../img/Marco-Rulfo.jpg';

const HERO_COPY = {
  eyebrow: 'DISPONIBLE PARA PROYECTOS WEB \u2022 REMOTO (MX)',
  title: 'Frontend Developer (React)',
  titleAccent: 'enfocado en performance, SEO y anal\u00EDtica',
  description:
    'Construyo interfaces con React (TypeScript + Tailwind), integradas con APIs, optimizadas para Core Web Vitals y SEO t\u00E9cnico. Instrumento medici\u00F3n con GA4 y creo animaciones con GSAP/ScrollTrigger.',
  badges: [
    'React + TypeScript',
    'Core Web Vitals',
    'GA4 (eventos/conv.)',
    'GSAP/ScrollTrigger',
  ],
  aiBadge: 'AI-ready: Responsible AI / Prompt Design (Vertex AI)',
  trust:
    'Payrolling-Tech (2025\u2013hoy) \u2022 ALGEDID/Hang Ten (2024\u20132025) \u2022 Freelance (2022\u20132024)',
};

const LINKEDIN_FALLBACK_URL = 'https://www.linkedin.com';

function Hero({
  cvMessage,
  githubUrl,
  isGeneratingCv,
  linkedinUrl,
  onDownloadCv,
  onNavigate,
}) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (!heroRef.current || typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const stages = gsap.utils.toArray('[data-hero-stage]');
      const visual = gsap.utils.toArray('[data-hero-visual]');

      if (stages.length > 0) {
        gsap.fromTo(
          stages,
          { y: 12, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.42,
            stagger: 0.06,
            ease: 'power2.out',
          }
        );
      }

      if (visual.length > 0) {
        gsap.fromTo(
          visual,
          { y: 12, autoAlpha: 0, scale: 0.985 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.56,
            delay: 0.1,
            ease: 'power2.out',
          }
        );
      }
    }, heroRef);

    return () => {
      context.revert();
    };
  }, []);

  const resolvedLinkedinUrl = linkedinUrl || LINKEDIN_FALLBACK_URL;

  const handleContactClick = () => {
    analytics.track('click_contact_me', {
      section: 'hero',
      label: 'contact_me',
    });
    onNavigate();
  };

  const handleDownloadClick = () => {
    analytics.track('click_download_cv', {
      section: 'hero',
      label: 'download_cv',
    });
    onDownloadCv();
  };

  const trackOutbound = (label, url) => {
    analytics.track('outbound_link', {
      section: 'hero',
      label,
      url,
    });
  };

  return (
    <section id="inicio" ref={heroRef} className={`section ${styles.root}`}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-hero-stage>
            {HERO_COPY.eyebrow}
          </p>

          <h1 className={styles.title} data-hero-stage>
            {HERO_COPY.title}
            <span className={styles.titleAccent}>{HERO_COPY.titleAccent}</span>
          </h1>

          <p className={styles.description} data-hero-stage>
            {HERO_COPY.description}
          </p>

          <div className={styles.badges} data-hero-stage>
            {HERO_COPY.badges.map((badge) => (
              <span key={badge} className={styles.badge}>
                {badge}
              </span>
            ))}
          </div>

          <div className={styles.meta} data-hero-stage>
            <span className={`${styles.badge} ${styles.badgeNote}`}>{HERO_COPY.aiBadge}</span>
          </div>

          <div className={styles.actions} data-hero-stage>
            <a className="button button--primary" href="#contacto" onClick={handleContactClick}>
              <Icon
                name="Mail"
                size="sm"
                color="var(--bg-primary)"
                className="icon--interactive"
              />
              <span>Cont\u00E1ctame</span>
            </a>

            <button
              className="button button--secondary"
              type="button"
              onClick={handleDownloadClick}
              disabled={isGeneratingCv}
            >
              <Icon
                name="Download"
                size="sm"
                color="secondary"
                className="icon--interactive"
              />
              <span>{isGeneratingCv ? 'Generando CV...' : 'Descargar CV'}</span>
            </button>
          </div>

          <div className={styles.links} data-hero-stage>
            <a
              className={styles.link}
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackOutbound('github', githubUrl)}
            >
              <Icon name="Github" size="sm" color="secondary" className="icon--interactive" />
              <span>GitHub</span>
            </a>

            <a
              className={styles.link}
              href={resolvedLinkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackOutbound('linkedin', resolvedLinkedinUrl)}
            >
              <Icon name="Linkedin" size="sm" color="secondary" className="icon--interactive" />
              <span>LinkedIn</span>
            </a>
          </div>

          {cvMessage ? (
            <p className={styles.feedback} data-hero-stage>
              {cvMessage}
            </p>
          ) : null}

          <p className={styles.trust} data-hero-stage>
            {HERO_COPY.trust}
          </p>
        </div>

        <div className={styles.media} data-hero-visual>
          <div className={styles.frame}>
            <img
              className={styles.image}
              src={heroPortrait}
              alt="Marco Rulfo, Frontend Developer enfocado en React, performance, SEO y analitica"
              width="960"
              height="1280"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
