export function buildMailBody({ name, email, projectType, deadline, message }) {
  return [
    'Hola Marco,',
    '',
    `Mi nombre es: ${name}`,
    `Mi correo es: ${email}`,
    '',
    `Tipo de proyecto: ${projectType || 'No definido'}`,
    `Deadline: ${deadline || 'No definido'}`,
    '',
    'Mensaje:',
    message,
    '',
    '---',
    'Enviado desde tu portafolio.',
  ].join('\n');
}

export function buildMailtoUrl({ to, subject, body }) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
