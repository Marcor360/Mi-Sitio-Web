import { useEffect, useId, useRef } from 'react';
import Icon from './ui/Icon.jsx';
import styles from './ProjectModal.module.css';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!project) {
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

      const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
        (element) =>
          element instanceof HTMLElement &&
          element.tabIndex !== -1 &&
          element.getAttribute('aria-hidden') !== 'true'
      );

      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!panelRef.current.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === overlayRef.current) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.headerCopy}>
            <p className={styles.eyebrow}>{project.company}</p>
            <h3 id={titleId} className={styles.title}>
              {project.title}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label={`Cerrar caso ${project.title}`}
          >
            x
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.block}>
            <p className={styles.label}>Problema</p>
            <p className={styles.copy}>{project.problem}</p>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Solucion</p>
            <p className={styles.copy}>{project.solution}</p>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Impacto</p>
            <p className={styles.copy}>{project.impact}</p>
          </div>

          <div className={styles.block}>
            <p className={styles.label}>Stack</p>
            <div className={styles.stack}>
              {project.stack.map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {project.links.length ? (
            <div className={styles.links}>
              {project.links.map((link) => (
                <a key={link.href} className={styles.link} href={link.href} target="_blank" rel="noreferrer">
                  <span>{link.label}</span>
                  <Icon name="ExternalLink" size="sm" color="secondary" className="icon--interactive icon--trailing" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
