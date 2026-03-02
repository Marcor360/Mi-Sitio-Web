import { useEffect, useId, useRef } from 'react';
import Icon from './ui/Icon.jsx';
import styles from './ExperienceModal.module.css';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function ExperienceModal({ experience, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!experience) {
      return undefined;
    }

    const activeElement = document.activeElement;
    previousFocusRef.current = activeElement instanceof HTMLElement ? activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTarget = closeButtonRef.current ?? panelRef.current;
    window.requestAnimationFrame(() => {
      focusTarget?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE_SELECTORS)
      ).filter((element) => {
        if (!(element instanceof HTMLElement)) {
          return false;
        }

        if (element.tabIndex === -1 || element.getAttribute('aria-hidden') === 'true') {
          return false;
        }

        return !element.hasAttribute('disabled');
      });

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const currentElement = document.activeElement;

      if (!panelRef.current.contains(currentElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
        return;
      }

      if (event.shiftKey && currentElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && currentElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [experience, onClose]);

  if (!experience) {
    return null;
  }

  const handleOverlayMouseDown = (event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onMouseDown={handleOverlayMouseDown}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>Experiencia</p>
            <h3 id={titleId} className={styles.title}>
              <span className="icon-inline icon-inline--tight">
                <Icon name="Briefcase" size="sm" color="accent" />
                <span>
                  {experience.role} - {experience.company}
                </span>
              </span>
            </h3>
            <p className={styles.meta}>{experience.dateRange}</p>
          </div>

          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label={`Cerrar detalle de ${experience.role}`}
          >
            <span className={styles.closeGlyph} aria-hidden="true">
              x
            </span>
          </button>
        </div>

        <div className={styles.body}>
          <p id={descriptionId} className={styles.summary}>
            {experience.summary}
          </p>

          <div className={styles.contentBlock}>
            <p className={styles.label}>Responsabilidades clave</p>
            <ul className={styles.bulletList}>
              {experience.bullets.map((bullet) => (
                <li key={bullet} className={styles.bulletItem}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contentBlock}>
            <p className={styles.label}>Stack y enfoque</p>
            <div className={styles.tags} aria-label={`Stack de ${experience.role}`}>
              {experience.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {experience.links?.length ? (
            <div className={styles.contentBlock}>
              <p className={styles.label}>Links</p>
              <div className={styles.links}>
                {experience.links.map((link) => (
                  <a
                    key={link.href}
                    className={styles.link}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{link.label}</span>
                    <Icon
                      name="ExternalLink"
                      size="sm"
                      color="secondary"
                      className="icon--interactive icon--trailing"
                    />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ExperienceModal;
