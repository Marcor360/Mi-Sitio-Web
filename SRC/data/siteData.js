import certificatesSource from './certificates.json';

export const heroVariants = {
  recruiter: {
    eyebrow: 'DISPONIBLE PARA PROYECTOS WEB • REMOTO (MX)',
    title: 'Frontend Developer (React/Next.js)',
    titleAccent: 'performance, SEO y analítica',
    subtitle: 'Marco Rulfo',
    description:
      'Construyo interfaces con React/Next.js (TypeScript + Tailwind), integradas con APIs, optimizadas para Core Web Vitals y SEO técnico. Instrumento medición con GA4 y desarrollo animaciones con GSAP/ScrollTrigger.',
    badges: ['Core Web Vitals', 'GA4 (eventos/conv.)', 'GSAP/ScrollTrigger', 'TypeScript'],
    trust: [
      { value: 'Payrolling-Tech', label: '2025-hoy' },
      { value: 'ALGEDID/Hang Ten', label: '2024-2025' },
      { value: 'Freelance', label: '2022-2024' },
    ],
  },
  freelance: {
    eyebrow: 'SOLUCIONES WEB RÁPIDAS, MEDIBLES Y ESCALABLES',
    title: 'Webs y apps que cargan rápido,',
    titleAccent: 'rankean mejor y convierten',
    subtitle: 'Marco Rulfo',
    description:
      'React/Next.js + TypeScript. Optimización de performance/SEO (Core Web Vitals), medición GA4 (eventos y conversiones) y animaciones GSAP para una experiencia premium.',
    badges: ['Core Web Vitals', 'GA4 (eventos/conv.)', 'GSAP/ScrollTrigger', 'TypeScript'],
    trust: [
      { value: 'Payrolling-Tech', label: '2025-hoy' },
      { value: 'ALGEDID/Hang Ten', label: '2024-2025' },
      { value: 'Freelance', label: '2022-2024' },
    ],
  },
};

export const activeHeroVariant = 'recruiter';

export const heroContent = heroVariants[activeHeroVariant];

export const navigationItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'formacion', label: 'Formación' },
  { id: 'certificaciones', label: 'Certificaciones' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
];

export const heroMetrics = [
  { value: '3+', label: 'años creando sitios, mejoras y soporte TI' },
  { value: '4', label: 'certificaciones recientes en IA y datos' },
  { value: '24/7', label: 'mentalidad orientada a rendimiento y servicio' },
];

export const profileLead =
  'Desarrollador web full stack y especialista en TI con enfoque en interfaces claras, performance y soluciones que resuelven problemas reales.';

export const aboutSummary =
  'Combino experiencia en desarrollo front-end y back-end con soporte técnico, mantenimiento e integración de procesos. Trabajo con HTML, CSS, Sass, JavaScript, React, Node.js, PHP y SQL, y me adapto rápido a nuevos stacks cuando el proyecto lo exige.';

export const aboutHighlights = [
  'Concluí la Ingeniería en Sistemas Computacionales en la Universidad Tres Culturas en agosto de 2025.',
  'Tengo experiencia tanto en proyectos freelance como en entornos operativos donde el soporte, la continuidad y la ejecución importan.',
  'Mi foco está en construir experiencias web responsivas, limpias y sostenibles, con criterio técnico y buena comunicación.',
];

export const experienceItems = [
  {
    id: 'payrolling-tech',
    index: '01',
    role: 'Desarrollador Front-end (React/Next.js)',
    company: 'Payrolling-Tech',
    period: 'Mayo 2025 - Actualidad',
    summary:
      'Interfaces para productos de nomina y RRHH, landings internas, integracion con APIs, performance, SEO y medicion con GA4.',
    details: [
      'UI en React y Next.js con TypeScript y Tailwind para flujos de producto.',
      'Integracion con APIs REST y colaboracion continua con backend y QA.',
      'Componentes reutilizables, accesibilidad y animaciones con GSAP.',
      'Optimizacion de Core Web Vitals y soporte para SEO tecnico y GA4.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GA4', 'GSAP', 'SEO'],
  },
  {
    id: 'algedid-hang-ten',
    index: '02',
    role: 'Desarrollador Front-end',
    company: 'Grupo ALGEDID (Hang Ten)',
    period: 'Octubre 2024 - Mayo 2025',
    summary:
      'Desarrollo front-end orientado a componentes, formularios, integracion con APIs y mejoras continuas de experiencia.',
    details: [
      'Construccion de componentes reutilizables y formularios conectados a APIs.',
      'Mejoras de performance, UX y soporte SEO on-page.',
      'Trabajo con Git y code reviews dentro del equipo.',
    ],
    stack: ['React/Next', 'TypeScript', 'APIs', 'SEO'],
  },
  {
    id: 'freelance',
    index: '03',
    role: 'Desarrollador Web',
    company: 'Freelance',
    period: 'Enero 2022 - 2024',
    summary:
      'Sitios y aplicaciones a medida con enfoque responsivo, mantenimiento evolutivo y mejoras orientadas a negocio.',
    details: [
      'Desarrollo de webs y apps a medida con enfoque responsive y mantenible.',
      'Back-end basico segun proyecto con Node.js, PHP y SQL.',
      'Optimizacion SEO on-page y soporte posterior al lanzamiento.',
    ],
    stack: ['React', 'Node', 'PHP', 'SQL', 'SEO'],
  },
  {
    id: 'aicca',
    index: '04',
    role: 'Encargado de Soporte TI',
    company: 'AICCA',
    period: 'Junio 2022 - Julio 2023',
    summary:
      'Liderazgo de soporte TI, continuidad operativa y mejora de tiempos de atencion en un entorno con demanda constante.',
    details: [
      'Lidere soporte TI para un equipo de 3 personas y reduje 30% el tiempo de resolucion.',
      'Soporte a usuarios, continuidad operativa y seguimiento de incidencias.',
      'Documentacion de procesos y mejoras para un servicio mas consistente.',
    ],
    stack: ['Soporte TI', 'Windows', 'Redes', 'Documentacion'],
  },
  {
    id: 'usa-shoes',
    index: '05',
    role: 'Becario de Sistemas',
    company: 'USA SHOES',
    period: 'Octubre 2023 - Febrero 2024',
    summary:
      'Soporte a la operacion tecnologica, mantenimiento y apoyo en procesos internos vinculados con inventario y sistemas.',
    details: [
      'Soporte a operacion tecnologica y mantenimiento de sistemas.',
      'Apoyo en procesos, inventario y herramientas tipo ERP.',
    ],
    stack: ['Soporte', 'ERP', 'Inventario'],
  },
];

export const educationItems = [
  {
    id: 'utc',
    type: 'Formación principal',
    title: 'Ingeniería en Sistemas Computacionales',
    institution: 'Universidad Tres Culturas',
    period: 'En curso | último año',
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

educationItems[0].period = 'Concluida | Agosto 2025';

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

export const certificates = certificatesSource.certificates;
