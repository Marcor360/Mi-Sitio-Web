import Icon from './ui/Icon.jsx';

function SectionHeading({ eyebrow, title, description, iconName }) {
  return (
    <header className="section-heading" data-reveal>
      <p className="section-heading__eyebrow">
        {iconName ? (
          <span className="icon-inline icon-inline--tight">
            <Icon name={iconName} size="xs" color="accent" />
            <span>{eyebrow}</span>
          </span>
        ) : (
          eyebrow
        )}
      </p>
      <h2 className="section-heading__title">{title}</h2>
      <p className="section-heading__description">{description}</p>
    </header>
  );
}

export default SectionHeading;
