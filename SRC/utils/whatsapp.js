export function buildWhatsAppUrl({ phone, projectType }) {
  const safeType = projectType || 'un proyecto web';
  const message = `Hola Marco, vi tu portafolio. Me interesa: ${safeType}. ¿Podemos platicar?`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
