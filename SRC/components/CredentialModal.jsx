import { useEffect, useId, useRef } from 'react';
import Icon from './ui/Icon.jsx';
import { analytics } from '../lib/analytics.js';
import styles from './CredentialModal.module.css';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function CredentialModal({ credential, applicationText, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!credential) {
      return undefined;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(() => {
      (closeButtonRef.current ?? panelRef.current)?.focus();
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
  }, [credential, onClose]);

  if (!credential) {
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
            <p className={styles.eyebrow}>Credencial</p>
            <h3 id={titleId} className={styles.title}>
              {credential.title}
            </h3>
            <p className={styles.meta}>
              {credential.issuer} · {credential.date}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label={`Cerrar detalle de ${credential.title}`}
          >
            <span className={styles.closeGlyph} aria-hidden="true">
              x
            </span>
          </button>
        </div>

        <div className={styles.body}>
          <p id={descriptionId} className={styles.summary}>
            {credential.summary}
          </p>

          {credential.credentialId ? (
            <div className={styles.block}>
              <p className={styles.label}>ID de credencial</p>
              <p className={styles.value}>{credential.credentialId}</p>
            </div>
          ) : null}

          <div className={styles.block}>
            <p className={styles.label}>Skills</p>
            <div className={styles.tags} aria-label={`Skills de ${credential.title}`}>
              {credential.skills.map((skill) => (
                <span key={skill} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Aplicacion practica</p>
            <p className={styles.value}>{applicationText}</p>
          </div>

          {credential.url ? (
            <a
              className={styles.link}
              href={credential.url}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                analytics.track('outbound_link', {
                  section: 'certs',
                  label: credential.id,
                  url: credential.url,
                })
              }
            >
              <span>Ver credencial</span>
              <Icon
                name="ExternalLink"
                size="sm"
                color="secondary"
                className="icon--interactive icon--trailing"
              />
            </a>
          ) : (
            <span className={styles.tooltip} title="Enlace no disponible">
              <button className={styles.disabledButton} type="button" disabled>
                <span>Sin enlace publico</span>
                <Icon name="ExternalLink" size="sm" color="muted" className="icon--trailing" />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CredentialModal;
