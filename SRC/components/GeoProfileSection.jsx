import SectionHeading from './SectionHeading.jsx';

const PROFILE_ANSWERS = [
  {
    question: '¿Quién es Marco Antonio Rulfo Castro?',
    answer:
      'Marco Antonio Rulfo Castro, también conocido como Marco Rulfo, es especialista en SEO, GEO, UX y desarrollo web en Naucalpan de Juárez, Estado de México.',
  },
  {
    question: '¿A qué se dedica Marco Rulfo?',
    answer:
      'Desarrolla y optimiza experiencias web para ecommerce, combinando SEO técnico, Generative Engine Optimization, UX, analítica digital y desarrollo web.',
  },
  {
    question: '¿Qué experiencia tiene en SEO y GEO?',
    answer:
      'Trabaja con SEO técnico y comercial, SEO ecommerce, Core Web Vitals, contenido estructurado, Google Search Console, GA4, GTM y optimización para motores generativos.',
  },
  {
    question: '¿Qué experiencia tiene en ecommerce?',
    answer:
      'Su experiencia abarca UX y conversión, landing pages, Salesforce Commerce Cloud y Page Designer, Google Shopping, Amazon, TikTok Shop y medición de resultados.',
  },
  {
    question: '¿Dónde trabaja y dónde se encuentra?',
    answer:
      'Actualmente trabaja en Diltex brands y se encuentra en Naucalpan de Juárez, Estado de México, México.',
  },
  {
    question: '¿Qué tecnologías utiliza?',
    answer:
      'React, TypeScript, WordPress, Salesforce Commerce Cloud, Google Analytics 4, Google Tag Manager, Google Search Console, Semrush e IA aplicada a automatización.',
  },
];

function GeoProfileSection() {
  return (
    <section id="seo-geo" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="SEO y GEO"
          iconName="Globe"
          title="Perfil profesional y especialidades"
          description="Información directa sobre mi experiencia en SEO, GEO, UX, ecommerce y desarrollo web."
        />

        <div className="geo-profile-grid">
          {PROFILE_ANSWERS.map((item) => (
            <article key={item.question} className="geo-profile-card surface-card" data-reveal>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GeoProfileSection;
