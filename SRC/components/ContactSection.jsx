import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Icon from './ui/Icon.jsx';
import { analytics } from '../lib/analytics.js';
import { buildMailBody, buildMailtoUrl } from '../utils/buildMailto.js';
import { consumeContactSend } from '../utils/rateLimit.js';
import { buildWhatsAppUrl } from '../utils/whatsapp.js';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = ['Landing', 'App', 'Performance', 'SEO', 'GA4', 'Otro'];

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
  projectType: '',
  hasDeadline: false,
  deadline: '',
  website: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Ingresa tu nombre.';
  }

  if (!form.email.trim()) {
    errors.email = 'Ingresa tu email.';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Ingresa un email valido.';
  }

  if (!form.subject.trim()) {
    errors.subject = 'Ingresa un asunto.';
  }

  if (!form.message.trim()) {
    errors.message = 'Ingresa un mensaje.';
  } else if (form.message.trim().length < 20) {
    errors.message = 'El mensaje debe tener al menos 20 caracteres.';
  }

  if (form.hasDeadline && !form.deadline) {
    errors.deadline = 'Selecciona una fecha si tienes deadline.';
  }

  return errors;
}

function getStatusTone(type) {
  switch (type) {
    case 'success':
      return styles.statusSuccess;
    case 'error':
      return styles.statusError;
    case 'loading':
      return styles.statusLoading;
    default:
      return '';
  }
}

function ContactSection({ contactInfo }) {
  const sectionRef = useRef(null);
  const layoutRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [preparedMessage, setPreparedMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  useLayoutEffect(() => {
    if (!sectionRef.current || !layoutRef.current || typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const columns = gsap.utils.toArray('[data-contact-col]');

      if (columns.length > 0) {
        gsap.fromTo(
          columns,
          { y: 10, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.42,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: layoutRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  const currentErrors = useMemo(() => validateForm(form), [form]);
  const isFormValid = Object.keys(currentErrors).length === 0;

  const mailBody = useMemo(
    () =>
      buildMailBody({
        name: form.name.trim(),
        email: form.email.trim(),
        projectType: form.projectType,
        deadline: form.hasDeadline ? form.deadline : '',
        message: form.message.trim(),
      }),
    [form]
  );

  const mailtoUrl = useMemo(
    () =>
      buildMailtoUrl({
        to: contactInfo.email,
        subject: form.subject.trim() || 'Consulta desde portafolio',
        body: mailBody,
      }),
    [contactInfo.email, form.subject, mailBody]
  );

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        phone: contactInfo.phoneRaw.replace('+', ''),
        projectType: form.projectType || 'un proyecto web',
      }),
    [contactInfo.phoneRaw, form.projectType]
  );

  const linkedinUrl = contactInfo.linkedinUrl || 'https://www.linkedin.com/';
  const githubUrl = contactInfo.githubUrl;

  const handleWhatsAppClick = (label) => {
    analytics.track('click_whatsapp', {
      section: 'contact',
      label,
      url: whatsappUrl,
    });
  };

  const trackOutbound = (label, url) => {
    analytics.track('outbound_link', {
      section: 'contact',
      label,
      url,
    });
  };

  const handleFieldChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setForm((current) => {
      const next = {
        ...current,
        [name]: nextValue,
      };

      if (name === 'hasDeadline' && !checked) {
        next.deadline = '';
      }

      return next;
    });

    setErrors((current) => {
      if (!current[name] && !(name === 'hasDeadline' && current.deadline)) {
        return current;
      }

      const nextForm = {
        ...form,
        [name]: nextValue,
        ...(name === 'hasDeadline' && !checked ? { deadline: '' } : {}),
      };

      return validateForm(nextForm);
    });
  };

  const handleBlur = () => {
    setErrors(validateForm(form));
  };

  const handleCopyEmail = async () => {
    try {
      analytics.track('click_email_copy', {
        section: 'contact',
        label: 'copy_email',
      });
      await navigator.clipboard.writeText(contactInfo.email);
      setCopiedEmail(true);
      setStatus({ type: 'success', message: 'Email copiado al portapapeles.' });
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch (error) {
      setStatus({ type: 'error', message: 'No se pudo copiar el email.' });
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(preparedMessage || mailBody);
      setCopiedMessage(true);
      setStatus({ type: 'success', message: 'Mensaje copiado. Ya puedes pegarlo en tu correo.' });
      window.setTimeout(() => setCopiedMessage(false), 1800);
    } catch (error) {
      setStatus({ type: 'error', message: 'No se pudo copiar el mensaje.' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.website.trim()) {
      setStatus({ type: 'error', message: 'No se pudo procesar el envio.' });
      return;
    }

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Revisa los campos marcados antes de continuar.' });
      return;
    }

    const rateLimit = consumeContactSend();

    if (!rateLimit.allowed) {
      const retryInSeconds = Math.max(1, Math.ceil(rateLimit.retryAfterMs / 1000));
      setStatus({
        type: 'error',
        message: `Espera ${retryInSeconds}s antes de preparar otro correo.`,
      });
      return;
    }

    analytics.track('submit_prepare_email', {
      section: 'contact',
      label: form.projectType || 'No definido',
    });

    setStatus({ type: 'loading', message: 'Preparando...' });
    setShowCopyMessage(false);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 600);
    });

    setPreparedMessage(mailBody);
    window.location.href = mailtoUrl;
    setStatus({ type: 'success', message: 'Listo: se abrio tu cliente de correo.' });
    setShowCopyMessage(true);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <section id="contacto" className="section" ref={sectionRef}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span className="icon-inline icon-inline--tight">
              <Icon name="Mail" size="xs" color="accent" />
              <span>CONTACTO</span>
            </span>
          </p>
          <h2 className={styles.title}>Hablemos de tu proyecto</h2>
          <p className={styles.description}>
            Respondo en 24-48h. Desarrollo front-end, optimizacion de performance/SEO,
            analitica GA4 y mejoras UI con animacion.
          </p>
        </header>

        <div className={styles.layout} ref={layoutRef}>
          <aside className={`surface-card ${styles.infoColumn}`} data-contact-col>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Canales directos</h3>

              <div className={styles.contactList}>
                <div className={styles.contactRow}>
                  <div className={styles.contactMeta}>
                    <span className="icon-inline icon-inline--tight">
                      <Icon name="Mail" size="sm" color="secondary" />
                      <span>Email</span>
                    </span>
                    <a className={styles.contactValue} href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </a>
                  </div>
                  <button className={styles.inlineButton} type="button" onClick={handleCopyEmail}>
                    {copiedEmail ? 'Copiado' : 'Copiar'}
                  </button>
                </div>

                <div className={styles.contactRow}>
                  <div className={styles.contactMeta}>
                    <span className="icon-inline icon-inline--tight">
                      <Icon name="MessageCircle" size="sm" color="secondary" />
                      <span>WhatsApp</span>
                    </span>
                    <span className={styles.contactValue}>{contactInfo.phoneLabel}</span>
                  </div>
                  <a
                    className={styles.inlineButtonLink}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleWhatsAppClick('whatsapp_primary')}
                  >
                    Abrir chat
                  </a>
                </div>

                <div className={styles.contactRowStatic}>
                  <span className="icon-inline icon-inline--tight">
                    <Icon name="Phone" size="sm" color="secondary" />
                    <span>Telefono</span>
                  </span>
                  <a className={styles.contactValue} href={`tel:${contactInfo.phoneRaw}`}>
                    {contactInfo.phoneLabel}
                  </a>
                </div>

                <div className={styles.contactRowStatic}>
                  <span className="icon-inline icon-inline--tight">
                    <Icon name="Linkedin" size="sm" color="secondary" />
                    <span>LinkedIn</span>
                  </span>
                  <a
                    className={styles.contactValue}
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackOutbound('linkedin', linkedinUrl)}
                  >
                    Abrir perfil
                  </a>
                </div>

                <div className={styles.contactRowStatic}>
                  <span className="icon-inline icon-inline--tight">
                    <Icon name="Github" size="sm" color="secondary" />
                    <span>GitHub</span>
                  </span>
                  <a
                    className={styles.contactValue}
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackOutbound('github', githubUrl)}
                  >
                    github.com/Marcor360
                  </a>
                </div>

                <div className={styles.contactRowStatic}>
                  <span className="icon-inline icon-inline--tight">
                    <Icon name="MapPin" size="sm" color="secondary" />
                    <span>Ubicacion</span>
                  </span>
                  <span className={styles.contactValue}>Naucalpan, Edo. Mex. (Remoto)</span>
                </div>
              </div>
            </div>

            <div className={styles.availabilityCard}>
              <p className={styles.availabilityEyebrow}>Disponibilidad</p>
              <p className={styles.availabilityLine}>Remoto • Proyectos y soporte</p>
              <p className={styles.availabilityLine}>Tiempo de respuesta: 24-48h</p>
            </div>
          </aside>

          <div className={`surface-card ${styles.formColumn}`} data-contact-col>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                className={styles.honeypot}
                type="text"
                name="website"
                value={form.website}
                onChange={handleFieldChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">Nombre</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Tu nombre"
                    aria-invalid={errors.name ? 'true' : 'false'}
                  />
                  {errors.name ? (
                    <p className={styles.errorText} aria-live="polite">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="tu@email.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email ? (
                    <p className={styles.errorText} aria-live="polite">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="contact-subject">Asunto</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                    placeholder="Cuentame que necesitas"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  />
                  {errors.subject ? (
                    <p className={styles.errorText} aria-live="polite">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-type">Tipo de proyecto</label>
                  <select
                    id="contact-type"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleFieldChange}
                    className={styles.select}
                  >
                    <option value="">Selecciona una opcion</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={`${styles.field} ${styles.fieldCheckbox}`}>
                  <label className={styles.checkboxLabel} htmlFor="contact-deadline-toggle">
                    <input
                      id="contact-deadline-toggle"
                      name="hasDeadline"
                      type="checkbox"
                      checked={form.hasDeadline}
                      onChange={handleFieldChange}
                    />
                    <span>Tengo deadline</span>
                  </label>
                </div>

                {form.hasDeadline ? (
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label htmlFor="contact-deadline">Deadline</label>
                    <input
                      id="contact-deadline"
                      name="deadline"
                      type="date"
                      value={form.deadline}
                      onChange={handleFieldChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${errors.deadline ? styles.inputError : ''}`}
                      aria-invalid={errors.deadline ? 'true' : 'false'}
                    />
                    {errors.deadline ? (
                      <p className={styles.errorText} aria-live="polite">
                        {errors.deadline}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <div className={`${styles.field} ${styles.fieldFull}`}>
                  <label htmlFor="contact-message">Mensaje</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="Describe tu proyecto, mejora o necesidad"
                    aria-invalid={errors.message ? 'true' : 'false'}
                  />
                  {errors.message ? (
                    <p className={styles.errorText} aria-live="polite">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={!isFormValid || status.type === 'loading'}
                >
                  <Icon
                    name="Mail"
                    size="sm"
                    color="var(--bg-primary)"
                    className="icon--interactive"
                  />
                  <span>{status.type === 'loading' ? 'Preparando...' : 'Preparar correo'}</span>
                </button>

                <div className={styles.altActions}>
                  <a
                    className={styles.secondaryLink}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleWhatsAppClick('whatsapp_secondary')}
                  >
                    Prefieres WhatsApp? Abrir chat
                  </a>
                  <button className={styles.secondaryButton} type="button" onClick={handleCopyEmail}>
                    O copia mi email
                  </button>
                </div>

                {showCopyMessage ? (
                  <div className={styles.fallbackBox}>
                    <p className={styles.fallbackCopy}>
                      Si tu cliente no se abrio, puedes copiar el mensaje completo.
                    </p>
                    <button
                      className={styles.fallbackButton}
                      type="button"
                      onClick={handleCopyMessage}
                    >
                      {copiedMessage ? 'Mensaje copiado' : 'Copiar mensaje'}
                    </button>
                  </div>
                ) : null}

                {status.message ? (
                  <p
                    className={`${styles.status} ${getStatusTone(status.type)}`}
                    aria-live="polite"
                  >
                    {status.message}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
