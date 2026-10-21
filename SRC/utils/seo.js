import { professionalProfile } from '../data/siteConfig.js';
import { profileAnswers } from '../data/profileAnswers.js';

// Compartido por el prerender y las comprobaciones: los hechos proceden del perfil visible.
export function buildStructuredData(siteUrl, contact, credentials) {
  const personId = `${siteUrl || ''}/#marco-antonio-rulfo-castro`;
  const websiteId = `${siteUrl || ''}/#website`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': personId,
        name: professionalProfile.fullName, alternateName: professionalProfile.shortName,
        jobTitle: 'Especialista SEO, GEO, UX y Desarrollo Web',
        description: professionalProfile.description,
        email: `mailto:${contact.email}`,
        sameAs: [contact.githubUrl, contact.linkedinUrl].filter(Boolean),
        homeLocation: { '@type': 'Place', name: contact.location },
        worksFor: { '@type': 'Organization', name: 'Diltex brands' },
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad Tres Culturas' },
        knowsAbout: ['SEO técnico', 'SEO ecommerce', 'Generative Engine Optimization', 'UX', 'React', 'WordPress', 'Salesforce Commerce Cloud', 'Google Analytics 4'],
        hasCredential: credentials.filter((item) => item.url && !item.pendingVerification).map((item) => ({
          '@type': 'EducationalOccupationalCredential', name: item.title, url: item.url,
          recognizedBy: { '@type': 'Organization', name: item.issuer },
          ...(item.credentialId ? { identifier: item.credentialId } : {}),
        })),
        ...(siteUrl ? { url: `${siteUrl}/` } : {}),
      },
      {
        '@type': 'WebSite', '@id': websiteId,
        name: professionalProfile.title, inLanguage: 'es-MX',
        publisher: { '@id': personId },
        ...(siteUrl ? { url: `${siteUrl}/` } : {}),
      },
      {
        '@type': 'ProfilePage', '@id': `${siteUrl || ''}/#profile`,
        name: `Perfil profesional de ${professionalProfile.fullName}`, inLanguage: 'es-MX',
        description: professionalProfile.description, keywords: professionalProfile.keywords,
        hasPart: { '@id': `${siteUrl || ''}/#seo-geo` },
        mainEntity: { '@id': personId }, isPartOf: { '@id': websiteId },
        ...(siteUrl ? { url: `${siteUrl}/` } : {}),
      },
      {
        '@type': 'FAQPage', '@id': `${siteUrl || ''}/#seo-geo`,
        name: `Preguntas frecuentes sobre ${professionalProfile.fullName}`,
        inLanguage: 'es-MX', about: { '@id': personId },
        isPartOf: { '@id': `${siteUrl || ''}/#profile` },
        ...(siteUrl ? { url: `${siteUrl}/#seo-geo` } : {}),
        mainEntity: profileAnswers.map(({ id, question, answer }) => ({
          '@type': 'Question', '@id': `${siteUrl || ''}/#pregunta-${id}`,
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}
