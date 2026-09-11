const SEO_DEFAULTS = {
  author: 'Marco Antonio Rulfo Castro',
  description:
    'Marco Antonio Rulfo Castro, especialista en SEO, GEO, UX y desarrollo web en Naucalpan, Estado de México. Experiencia en ecommerce, React, WordPress, Salesforce Commerce Cloud, GA4, GTM, IA y optimización web.',
  keywords:
    'Marco Antonio Rulfo Castro, Marco Rulfo, especialista SEO, especialista GEO, SEO técnico, SEO ecommerce, consultor SEO México, desarrollo web México, UX web, Generative Engine Optimization, React, WordPress, Salesforce Commerce Cloud, GA4, Google Tag Manager',
  locale: 'es_MX',
  previewAlt: 'Preview del portafolio de Marco Antonio Rulfo Castro',
  previewImagePath: '/social-preview.svg',
  siteName: 'Marco Antonio Rulfo Castro | SEO, GEO, UX y Desarrollo Web',
  themeColor: '#FFFFFF',
  title: 'Marco Antonio Rulfo Castro | SEO, GEO, UX y Desarrollo Web',
};

function upsertMeta(attributeName, attributeValue, content) {
  let element = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function getCanonicalUrl() {
  const url = new URL(window.location.href);
  url.hash = '';
  url.search = '';
  return url.toString();
}

function getAbsoluteAssetUrl(assetPath) {
  return new URL(assetPath, window.location.origin).toString();
}

function upsertStructuredData({ canonicalUrl, email, githubUrl, linkedinUrl, location, previewImageUrl }) {
  const sameAs = [githubUrl, linkedinUrl].filter(Boolean);
  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      email: email ? `mailto:${email}` : undefined,
      image: previewImageUrl,
      '@id': `${canonicalUrl}#marco-antonio-rulfo-castro`,
      alternateName: 'Marco Rulfo',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Tres Culturas' },
      description: 'Especialista en SEO, GEO, UX, desarrollo web, ecommerce, analítica digital e inteligencia artificial.',
      jobTitle: 'Especialista SEO, GEO, UX y Desarrollo Web',
      knowsAbout: ['SEO', 'Generative Engine Optimization', 'SEO técnico', 'SEO ecommerce', 'UX', 'React', 'TypeScript', 'WordPress', 'Salesforce Commerce Cloud', 'Google Analytics 4', 'Google Tag Manager', 'Google Search Console', 'Inteligencia Artificial'],
      name: SEO_DEFAULTS.author,
      sameAs,
      url: canonicalUrl,
      worksFor: {
        '@type': 'Organization',
        name: 'Diltex brands',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      description: SEO_DEFAULTS.description,
      inLanguage: 'es-MX',
      name: SEO_DEFAULTS.siteName,
      url: canonicalUrl,
    },
  ];

  if (location) {
    graph[0].homeLocation = {
      '@type': 'Place',
      name: location,
    };
  }

  let element = document.head.querySelector('#structured-data');

  if (!element) {
    element = document.createElement('script');
    element.setAttribute('id', 'structured-data');
    element.setAttribute('type', 'application/ld+json');
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph.map((item) => {
      const { '@context': _context, ...rest } = item;
      return rest;
    }),
  });
}

export function applyDefaultSeo({ email, githubUrl, linkedinUrl, location } = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const canonicalUrl = getCanonicalUrl();
  const previewImageUrl = getAbsoluteAssetUrl(SEO_DEFAULTS.previewImagePath);

  document.documentElement.lang = 'es';
  document.title = SEO_DEFAULTS.title;

  upsertMeta('name', 'description', SEO_DEFAULTS.description);
  upsertMeta('name', 'keywords', SEO_DEFAULTS.keywords);
  upsertMeta('name', 'author', SEO_DEFAULTS.author);
  upsertMeta('name', 'robots', 'index,follow');
  upsertMeta('name', 'theme-color', SEO_DEFAULTS.themeColor);
  upsertMeta('property', 'og:locale', SEO_DEFAULTS.locale);
  upsertMeta('property', 'og:site_name', SEO_DEFAULTS.siteName);
  upsertMeta('property', 'og:title', SEO_DEFAULTS.title);
  upsertMeta('property', 'og:description', SEO_DEFAULTS.description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:image', previewImageUrl);
  upsertMeta('property', 'og:image:alt', SEO_DEFAULTS.previewAlt);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', SEO_DEFAULTS.title);
  upsertMeta('name', 'twitter:description', SEO_DEFAULTS.description);
  upsertMeta('name', 'twitter:image', previewImageUrl);
  upsertLink('canonical', canonicalUrl);

  upsertStructuredData({
    canonicalUrl,
    email,
    githubUrl,
    linkedinUrl,
    location,
    previewImageUrl,
  });
}
