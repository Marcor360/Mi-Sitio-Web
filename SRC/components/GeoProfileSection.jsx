import SectionHeading from './SectionHeading.jsx';

import { profileAnswers } from '../data/profileAnswers.js';

function GeoProfileSection() {
  return (
    <section id="seo-geo" className="section" aria-label="Preguntas frecuentes">
      <div className="container">
        <SectionHeading
          eyebrow="Preguntas frecuentes"
          iconName="Globe"
          title="Sobre Marco Antonio Rulfo Castro"
          description="Respuestas sobre mi perfil, experiencia, formación y servicios de SEO, GEO, UX y desarrollo web en México."
        />

        <div className="geo-profile-grid">
          {profileAnswers.map((item, index) => (
            <article id={`pregunta-${item.id}`} key={item.id} className="geo-profile-card surface-card" data-reveal>
              <details open={index === 0}>
                <summary><h3>{item.question}</h3></summary>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                  {item.links ? (
                    <ul className="faq-links" aria-label="Información relacionada">
                      {item.links.map((link) => (
                        <li key={link.href}><a href={link.href}>{link.label}</a></li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GeoProfileSection;
