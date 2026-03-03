import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SectionHeading from './components/SectionHeading.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import MobileCTA from './components/MobileCTA.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import {
  aboutDetails,
  aboutHighlights,
  aboutStrengths,
  aboutSummary,
  aboutTechChips,
  certificates,
  contactInfo,
  educationItems,
  navigationItems,
  profileLead,
  skillGroups,
  socialLinks,
} from './data/siteData.js';
import experienceItems from './data/experience.js';
import { analytics } from './lib/analytics.js';
import { useGsapAnimations } from './hooks/useGsapAnimations.js';
import { generateCvPdf } from './utils/generateCv.js';
import { applyDefaultSeo } from './utils/seo.js';
import aboutPortrait from './img/Marco-Rulfo-2.jpg';

const CertificationsSection = lazy(() => import('./components/CertificationsSection.jsx'));
const SkillsSection = lazy(() => import('./components/SkillsSection.jsx'));
const ContactSection = lazy(() => import('./components/ContactSection.jsx'));

function SectionFallback({ minHeight = 360 }) {
  return (
    <section className="section" aria-hidden="true">
      <div className="container">
        <div
          className="surface-card"
          style={{
            minHeight: `${minHeight}px`,
          }}
        />
      </div>
    </section>
  );
}

function App() {
  const appRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvMessage, setCvMessage] = useState('');
  const [isGeneratingCv, setIsGeneratingCv] = useState(false);

  useGsapAnimations(appRef);

  useEffect(() => {
    applyDefaultSeo({
      email: contactInfo.email,
      githubUrl: contactInfo.githubUrl,
      location: contactInfo.location,
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };
  const handleDownloadCv = async () => {
    try {
      setIsGeneratingCv(true);
      setCvMessage('');

      await generateCvPdf({
        aboutHighlights,
        aboutSummary,
        certificates,
        contactInfo,
        educationItems,
        experienceItems: experienceItems.map((item) => ({
          ...item,
          period: item.dateRange,
          details: item.bullets,
          stack: item.tags,
        })),
        profileLead,
        skillGroups,
      });

      setCvMessage('El CV se descargó correctamente.');
    } catch (error) {
      console.error('No se pudo generar el CV:', error);
      setCvMessage('Hubo un problema al generar el CV. Intenta nuevamente.');
    } finally {
      setIsGeneratingCv(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="app-shell" ref={appRef}>
      <Header
        menuOpen={menuOpen}
        navigationItems={navigationItems}
        onNavigate={handleNavClick}
        onToggle={() => setMenuOpen((current) => !current)}
      />

      <main>
        <Hero
          cvMessage={cvMessage}
          githubUrl={contactInfo.githubUrl}
          isGeneratingCv={isGeneratingCv}
          linkedinUrl={contactInfo.linkedinUrl}
          onDownloadCv={handleDownloadCv}
          onNavigate={handleNavClick}
        />

        <section id="sobre-mi" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Perfil"
              iconName="Shield"
              title="Soluciones web con criterio técnico y enfoque realista"
              description="Desarrollo, soporte y ejecución operativa con foco en experiencias web limpias, mantenibles y alineadas con lo que el proyecto necesita."
            />

            <div className="about__layout">
              <div className="about__media surface-card" data-reveal>
                <img
                  className="about__portrait"
                  src={aboutPortrait}
                  alt="Marco Antonio Rulfo Castro en retrato alterno"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="about__content surface-card" data-reveal>
                <div className="about__prose">
                  <p className="about__lead">{aboutSummary}</p>
                  <p className="about__lead">{aboutDetails}</p>
                </div>

                <div className="about__strengths">
                  <p className="about__subheading">Fortalezas por tipo de proyecto</p>

                  <ul className="about__bullets">
                    {aboutStrengths.map((item) => (
                      <li key={item} className="about__bullet">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="about__chips" aria-label="Tecnologías principales">
                  {aboutTechChips.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ExperienceSection />
        <ProjectsSection />

        <section id="formacion" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Formación"
              iconName="GraduationCap"
              title="Base académica y actualización constante"
              description="Se añadió una sección real de formación para que la navegación ya no apunte a un ancla rota."
            />

            <div className="education-grid">
              {educationItems.map((item) => (
                <article key={item.id} className="education-card surface-card" data-reveal>
                  <p className="education-card__type">{item.type}</p>
                  <div className="card-meta">
                    <h3>{item.title}</h3>
                    <p>{item.institution}</p>
                    <span className="card-period">{item.period}</span>
                  </div>
                  <p className="education-card__copy">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<SectionFallback minHeight={440} />}>
          <CertificationsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight={520} />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight={520} />}>
          <ContactSection contactInfo={contactInfo} />
        </Suspense>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__inner">
            <div className="site-footer__row">
              <p className="site-footer__copy">
                {currentYear} · Marco Antonio Rulfo Castro · Portafolio en React, Sass y GSAP.
              </p>

              <div className="site-footer__links">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    className="site-footer__link"
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    onClick={() =>
                      analytics.track('outbound_link', {
                        section: 'footer',
                        label: item.label.toLowerCase(),
                        url: item.href,
                      })
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <MobileCTA contactInfo={contactInfo} />
    </div>
  );
}

export default App;




