import SectionHeading from './SectionHeading.jsx';

const services = [
  {
    title: 'SEO técnico y ecommerce',
    description: 'Revisión de rastreo, indexación, estructura y rendimiento para que buscadores y personas encuentren el contenido relevante.',
    deliverable: 'Diagnóstico priorizado, mejoras on-page y seguimiento con Search Console.',
  },
  {
    title: 'GEO y contenido claro',
    description: 'Organización de información útil sobre tu marca, productos y experiencia para facilitar su comprensión por buscadores y sistemas de IA.',
    deliverable: 'Contenido con fuentes, entidades consistentes y datos estructurados acordes con la página.',
  },
  {
    title: 'Desarrollo, UX y medición',
    description: 'Interfaces responsivas con React, mejoras de experiencia en ecommerce e instrumentación de eventos para evaluar resultados.',
    deliverable: 'Componentes mantenibles, revisión de Core Web Vitals y plan de medición con GA4 y GTM.',
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="section" aria-label="Servicios">
      <div className="container">
        <SectionHeading eyebrow="Cómo puedo ayudarte" title="Visibilidad, experiencia y resultados medibles" description="Un enfoque que conecta el diagnóstico técnico con la implementación y el seguimiento." />
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="surface-card service-card" key={service.title}>
              <span className="service-card__number" aria-hidden="true">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p className="service-card__deliverable"><strong>Entregables:</strong> {service.deliverable}</p>
            </article>
          ))}
        </div>
        <p className="services-contact"><a className="button button--primary" href="#contacto">Cuéntame sobre tu proyecto</a></p>
      </div>
    </section>
  );
}
