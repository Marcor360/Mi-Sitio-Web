const PAGE_BOTTOM = 277;
const MARGIN_X = 18;
const MARGIN_Y = 18;
const CONTENT_WIDTH = 174;

function ensureSpace(doc, cursorY, neededHeight = 12) {
  if (cursorY + neededHeight <= PAGE_BOTTOM) {
    return cursorY;
  }

  doc.addPage();
  return MARGIN_Y;
}

function writeParagraph(doc, text, cursorY, options = {}) {
  const fontSize = options.fontSize ?? 10;
  const color = options.color ?? [77, 95, 127];
  const lineHeight = options.lineHeight ?? 4.8;
  const spacingAfter = options.spacingAfter ?? 4;
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);

  doc.setFontSize(fontSize);
  doc.setTextColor(...color);
  doc.text(lines, MARGIN_X, cursorY);

  return cursorY + lines.length * lineHeight + spacingAfter;
}

function writeSectionTitle(doc, title, cursorY) {
  const nextY = ensureSpace(doc, cursorY, 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(18, 42, 76);
  doc.text(title.toUpperCase(), MARGIN_X, nextY);

  doc.setDrawColor(91, 184, 255);
  doc.setLineWidth(0.45);
  doc.line(MARGIN_X, nextY + 2, MARGIN_X + 36, nextY + 2);

  return nextY + 8;
}

function writeBulletList(doc, items, cursorY) {
  let nextY = cursorY;

  items.forEach((item) => {
    nextY = ensureSpace(doc, nextY, 10);
    const lines = doc.splitTextToSize(`- ${item}`, CONTENT_WIDTH);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(77, 95, 127);
    doc.text(lines, MARGIN_X, nextY);

    nextY += lines.length * 4.8 + 2.5;
  });

  return nextY;
}

export async function generateCvPdf({
  aboutHighlights,
  aboutSummary,
  certificates,
  contactInfo,
  educationItems,
  experienceItems,
  profileLead,
  skillGroups,
}) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  let cursorY = MARGIN_Y;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(21);
  doc.setTextColor(18, 42, 76);
  doc.text('Marco Antonio Rulfo Castro', MARGIN_X, cursorY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(47, 143, 255);
  doc.text('Desarrollador Web Full Stack y Especialista en TI', MARGIN_X, cursorY + 7);

  doc.setFontSize(9.5);
  doc.setTextColor(77, 95, 127);
  doc.text(
    `Email: ${contactInfo.email}  |  Tel: ${contactInfo.phoneLabel}  |  GitHub: github.com/Marcor360`,
    MARGIN_X,
    cursorY + 13
  );
  doc.text(`Ubicación: ${contactInfo.location}`, MARGIN_X, cursorY + 18);

  cursorY += 28;

  cursorY = writeSectionTitle(doc, 'Perfil profesional', cursorY);
  cursorY = writeParagraph(doc, profileLead, cursorY, { fontSize: 10.3, spacingAfter: 1.5 });
  cursorY = writeParagraph(doc, aboutSummary, cursorY, { spacingAfter: 3 });
  cursorY = writeBulletList(doc, aboutHighlights, cursorY);

  cursorY = writeSectionTitle(doc, 'Experiencia profesional', cursorY);

  experienceItems.forEach((experience) => {
    cursorY = ensureSpace(doc, cursorY, 20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.2);
    doc.setTextColor(18, 42, 76);
    doc.text(`${experience.role} · ${experience.company}`, MARGIN_X, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.4);
    doc.setTextColor(47, 143, 255);
    doc.text(experience.period, MARGIN_X, cursorY + 5);

    cursorY = writeParagraph(doc, experience.summary, cursorY + 10, { spacingAfter: 2.5 });
    cursorY = writeBulletList(doc, experience.details, cursorY);
  });

  cursorY = writeSectionTitle(doc, 'Formación', cursorY);

  educationItems.forEach((item) => {
    cursorY = ensureSpace(doc, cursorY, 18);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(18, 42, 76);
    doc.text(item.title, MARGIN_X, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.4);
    doc.setTextColor(47, 143, 255);
    doc.text(`${item.institution} · ${item.period}`, MARGIN_X, cursorY + 5);

    cursorY = writeParagraph(doc, item.description, cursorY + 10, { spacingAfter: 4 });
  });

  cursorY = writeSectionTitle(doc, 'Habilidades clave', cursorY);
  cursorY = writeBulletList(
    doc,
    skillGroups.flatMap((group) =>
      group.items.slice(0, 4).map((item) => `${item.name}: ${item.level}`)
    ),
    cursorY
  );

  cursorY = writeSectionTitle(doc, 'Certificaciones', cursorY);
  cursorY = writeBulletList(
    doc,
    certificates.map((item) => `${item.title} · ${item.issuer} (${item.date})`),
    cursorY
  );

  doc.save('CV_Marco_Antonio_Rulfo_Castro.pdf');
}
