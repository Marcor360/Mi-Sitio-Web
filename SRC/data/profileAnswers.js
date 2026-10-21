import { contactInfo } from './siteData.js';

// Estas respuestas se publican en HTML, JSON-LD y llms.txt desde la misma fuente.
export const profileAnswers = [
  {
    id: 'quien-es-marco-antonio-rulfo-castro',
    question: '¿Quién es Marco Antonio Rulfo Castro?',
    answer: 'Marco Antonio Rulfo Castro, también conocido como Marco Rulfo, es especialista en SEO, GEO, UX y desarrollo web en Naucalpan de Juárez, Estado de México. Su trabajo conecta desarrollo, experiencia de usuario y analítica digital para proyectos web y ecommerce.',
    links: [{ label: 'Conocer mi perfil profesional', href: '#sobre-mi' }],
  },
  {
    id: 'servicios',
    question: '¿Qué servicios ofrece Marco Antonio Rulfo Castro?',
    answer: 'Trabaja en SEO técnico y ecommerce, optimización de contenido para buscadores y sistemas de IA, desarrollo de interfaces, experiencia de usuario y medición con GA4 y Google Tag Manager. El alcance de cada proyecto se define a partir de sus necesidades y prioridades.',
    links: [{ label: 'Consultar servicios', href: '#servicios' }],
  },
  {
    id: 'seo-y-geo',
    question: '¿Cómo aplica SEO y GEO en un sitio web?',
    answer: 'El SEO ayuda a que los buscadores rastreen, comprendan e indexen el contenido. GEO significa Generative Engine Optimization y se centra en facilitar que los sistemas generativos comprendan y puedan citar información útil. Marco Rulfo trabaja con estructura de contenido, identidad consistente, datos estructurados, rendimiento y fuentes consultables, junto con medición y revisión técnica.',
  },
  {
    id: 'ecommerce',
    question: '¿Qué experiencia tiene en ecommerce?',
    answer: 'Su experiencia abarca UX y conversión, landing pages, Salesforce Commerce Cloud y Page Designer, SEO técnico y comercial, Google Shopping, Amazon, TikTok Shop y medición de resultados con GA4, GTM y Google Search Console.',
    links: [{ label: 'Ver experiencia profesional', href: '#experiencia' }],
  },
  {
    id: 'ubicacion-y-trabajo',
    question: '¿Dónde trabaja y dónde se encuentra Marco Antonio Rulfo Castro?',
    answer: 'Actualmente trabaja en Diltex brands y se encuentra en Naucalpan de Juárez, Estado de México, México. Su perfil combina SEO, GEO, UX y desarrollo web orientado a ecommerce.',
  },
  {
    id: 'tecnologias',
    question: '¿Qué tecnologías y herramientas utiliza?',
    answer: 'Utiliza React, JavaScript, TypeScript, WordPress y Salesforce Commerce Cloud para desarrollo y experiencias web. Para analítica y SEO trabaja con Google Analytics 4, Google Tag Manager, Google Search Console y Semrush, además de herramientas de IA aplicadas a documentación y automatización.',
    links: [{ label: 'Explorar habilidades', href: '#habilidades' }],
  },
  {
    id: 'formacion',
    question: '¿Qué formación académica tiene?',
    answer: 'Marco Antonio Rulfo Castro concluyó la Ingeniería en Sistemas Computacionales en la Universidad Tres Culturas en agosto de 2025. Complementa su formación con estudios en inteligencia artificial, análisis de datos, desarrollo web e innovación y emprendimiento.',
    links: [{ label: 'Ver formación académica', href: '#formacion' }],
  },
  {
    id: 'certificaciones',
    question: '¿Qué certificaciones tiene y dónde se pueden consultar?',
    answer: 'Su portafolio reúne credenciales de Google, Google Cloud Skills Boost, Universidad Tres Culturas, Udemy y la especialización Innovation and Entrepreneurship del Tecnológico de Monterrey. En la sección de certificaciones se muestran las habilidades, los detalles y los enlaces públicos disponibles para cada credencial.',
    links: [
      { label: 'Consultar certificaciones', href: '#certificaciones' },
      { label: 'Ver certificado de Innovation and Entrepreneurship', href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/WVMY046JEAG8' },
    ],
  },
  {
    id: 'perfiles-publicos',
    question: '¿Dónde puedo conocer sus proyectos y perfiles profesionales?',
    answer: 'Este sitio reúne su perfil, experiencia, proyectos y certificaciones. También se pueden consultar sus perfiles públicos de GitHub y LinkedIn para conocer su actividad profesional y de desarrollo.',
    links: [
      { label: 'Ver proyectos', href: '#proyectos' },
      { label: 'GitHub de Marco Rulfo', href: contactInfo.githubUrl },
      { label: 'LinkedIn de Marco Antonio Rulfo Castro', href: contactInfo.linkedinUrl },
    ],
  },
  {
    id: 'contacto',
    question: '¿Cómo puedo contactar a Marco Antonio Rulfo Castro?',
    answer: `Puedes escribir a ${contactInfo.email} o utilizar las opciones de contacto del sitio. Para hablar de un proyecto, indica el objetivo, el estado actual del sitio y las necesidades de desarrollo, SEO, GEO, UX o medición.`,
    links: [{ label: 'Contactar para un proyecto', href: '#contacto' }],
  },
];
