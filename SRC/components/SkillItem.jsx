import { useEffect, useId, useRef } from 'react';
import styles from './SkillItem.module.css';

function SkillItem({ skill, showDetails, tooltipOpen, onToggleTooltip, onCloseTooltip }) {
  const itemRef = useRef(null);
  const tooltipId = useId();

  useEffect(() => {
    if (!tooltipOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!itemRef.current?.contains(event.target)) {
        onCloseTooltip();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseTooltip();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tooltipOpen, onCloseTooltip]);

  return (
    <article
      ref={itemRef}
      className={`${styles.item} ${tooltipOpen ? styles.itemActive : ''}`}
      data-skill-row
    >
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h4 className={styles.name}>{skill.name}</h4>
          <p className={styles.levelText}>
            {skill.level}/5 · {skill.levelLabel}
          </p>
        </div>

        <button
          className={styles.infoButton}
          type="button"
          aria-label={`Ver contexto de ${skill.name}`}
          aria-describedby={tooltipOpen ? tooltipId : undefined}
          aria-expanded={tooltipOpen}
          onClick={() => onToggleTooltip(skill.id)}
        >
          <span aria-hidden="true">i</span>
        </button>
      </div>

      <div className={styles.meter} aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => {
          const isFilled = index < skill.level;

          return (
            <span
              key={`${skill.id}-${index + 1}`}
              className={styles.segment}
              data-meter-filled={isFilled ? 'true' : 'false'}
            />
          );
        })}
      </div>

      {showDetails ? (
        <div className={styles.details}>
          <div className={styles.evidenceList} aria-label={`Evidencia de ${skill.name}`}>
            {skill.evidence.map((item) => (
              <span key={item} className={styles.evidenceChip}>
                {item}
              </span>
            ))}
          </div>

          <div className={styles.tagList} aria-label={`Tags de ${skill.name}`}>
            {skill.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {tooltipOpen ? (
        <div className={styles.tooltip} role="tooltip" id={tooltipId}>
          <div className={styles.tooltipTop}>
            <p className={styles.tooltipTitle}>{skill.name}</p>
            <button
              className={styles.tooltipClose}
              type="button"
              onClick={onCloseTooltip}
              aria-label={`Cerrar detalle de ${skill.name}`}
            >
              x
            </button>
          </div>
          <p className={styles.tooltipCopy}>{skill.description}</p>
          <p className={styles.tooltipLabel}>Evidencia</p>
          <ul className={styles.tooltipList}>
            {skill.evidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}

export default SkillItem;
