import credentials from './credentials.js';

export const navigationItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'sobre-mi', label: 'Perfil' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'certificaciones', label: 'Certificaciones' },
  { id: 'seo-geo', label: 'Preguntas frecuentes' },
  { id: 'contacto', label: 'Contacto' },
];

export const heroMetrics = [
  { value: '3+', label: 'años creando sitios, mejoras y soporte TI' },
  { value: String(credentials.length), label: 'certificaciones y credenciales' },
  { value: '24/7', label: 'mentalidad orientada a rendimiento y servicio' },
];

export const profileLead =
  'Especialista en SEO, GEO, UX y desarrollo web con enfoque en ecommerce, analítica digital y soluciones web que resuelven problemas reales.';

export const aboutSummary =
  'Marco Antonio Rulfo Castro es especialista en SEO, GEO, UX y desarrollo web en Naucalpan de Juárez, Estado de México. Combino desarrollo, optimización de experiencias y analítica para ecommerce y proyectos digitales.';

export const aboutDetails =
  'Trabajo con React, TypeScript, WordPress, Salesforce Commerce Cloud, GA4, Google Tag Manager y Google Search Console. Mi experiencia integra SEO técnico, SEO ecommerce, Generative Engine Optimization, UX, automatización con IA y desarrollo de soluciones web sostenibles.';

export const aboutHighlights = [
  'Concluí la Ingeniería en Sistemas Computacionales en la Universidad Tres Culturas en agosto de 2025.',
  'Tengo experiencia tanto en proyectos freelance como en entornos operativos donde el soporte, la continuidad y la ejecución importan.',
  'Mi foco está en construir experiencias web responsivas, limpias y sostenibles, con criterio técnico y buena comunicación.',
];

export const aboutStrengths = [
  'React + Vite y flujo moderno de front (estructura de componentes, mantenibilidad, responsive y optimización básica de performance).',
  'Animación UI avanzada con GSAP/ScrollTrigger (secciones pinned, reveals, scroll-driven effects y microinteracciones orientadas a UX).',
  'TypeScript y TailwindCSS en proyectos reales (arquitectura, consistencia visual y escalabilidad del UI).',
  'Analítica y medición desde el front: GA4, Google Tag Manager, Google Search Console, estructuración de eventos, medición de embudos y soporte para audiencias de campañas.',
  'SEO técnico: control de indexación, buenas prácticas de canonical, estructura de páginas y consideraciones on-page para rendimiento y rastreo.',
  'Ads / tracking: implementación base de tracking para campañas (por ejemplo, eventos y audiencias para Meta Ads y Google Ads a partir del comportamiento on-site).',
];

export const aboutTechChips = [
  'React + Vite',
  'TypeScript',
  'TailwindCSS',
  'GSAP / ScrollTrigger',
  'GA4 / GTM',
  'SEO técnico',
];

export { experienceItems } from './experience.js';

export const educationItems = [
  {
    id: 'utc',
    type: 'Formación principal',
    title: 'Ingeniería en Sistemas Computacionales',
    institution: 'Universidad Tres Culturas',
    period: 'Concluida | Agosto 2025',
    description:
      'Trayectoria enfocada en programación, bases de datos, análisis de sistemas y fundamentos para el diseño e implementación de soluciones tecnológicas.',
  },
  {
    id: 'especializacion',
    type: 'Formación complementaria',
    title: 'Ruta aplicada en IA y análisis de datos',
    institution: 'Universidad Tres Culturas',
    period: '2025',
    description:
      'Complemento académico orientado a fundamentos de inteligencia artificial, ética de datos y comprensión de procesos básicos de análisis.',
  },
];


export const skillGroups = [
  {
    id: 'stack',
    title: 'Stack de desarrollo',
    items: [
      { name: 'HTML5 / CSS3 / Sass', level: '95%' },
      { name: 'JavaScript', level: '90%' },
      { name: 'React', level: '85%' },
      { name: 'Node.js', level: '80%' },
      { name: 'PHP', level: '84%' },
      { name: 'SQL', level: '85%' },
      { name: 'Git y GitHub', level: '90%' },
    ],
  },
  {
    id: 'ops',
    title: 'Operación y soporte',
    items: [
      { name: 'Soporte técnico', level: '95%' },
      { name: 'Mantenimiento de equipos', level: '90%' },
      { name: 'Administración de sistemas', level: '82%' },
      { name: 'Resolución de problemas', level: '95%' },
      { name: 'Trabajo en equipo', level: '90%' },
      { name: 'Comunicación efectiva', level: '90%' },
    ],
  },
];

export const contactInfo = {
  email: 'marcorulfo100@gmail.com',
  phoneLabel: '+52 55 3108 3353',
  phoneRaw: '+525531083353',
  whatsappUrl: 'https://wa.me/525531083353',
  githubUrl: 'https://github.com/Marcor360',
  linkedinUrl: 'https://mx.linkedin.com/in/marco-antonio-rulfo-castro-bb1867206',
  location: 'Naucalpan, Estado de México',
  referenceCompany: 'USA SHOES',
  referenceLabel: '+52 55 6800 3194',
  referenceRaw: '+525568003194',
};

export const contactCards = [
  {
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    label: 'Teléfono',
    value: contactInfo.phoneLabel,
    href: `tel:${contactInfo.phoneRaw}`,
  },
  {
    label: 'WhatsApp',
    value: contactInfo.phoneLabel,
    href: contactInfo.whatsappUrl,
  },
  {
    label: 'GitHub',
    value: 'github.com/Marcor360',
    href: contactInfo.githubUrl,
  },
];

export const socialLinks = [
  {
    label: 'Email',
    href: `mailto:${contactInfo.email}`,
  },
  {
    label: 'WhatsApp',
    href: contactInfo.whatsappUrl,
  },
  {
    label: 'GitHub',
    href: contactInfo.githubUrl,
  },
];

// El sitio y el CV comparten las mismas credenciales.
export const certificates = credentials.map(({ summary, skills, ...credential }) => ({
  ...credential, description: summary, tags: skills,
}));
