import { useEffect, useState } from 'react';

function Header({ menuOpen, navigationItems, onNavigate, onToggle }) {
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navigationItems]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="site-header__brand">
          <p className="site-header__name">Marco Antonio Rulfo Castro</p>
          <p className="site-header__role">SEO, GEO, UX y desarrollo web</p>
        </div>

        <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Secciones principales">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              className={`site-nav__link${activeSection === item.id ? ' site-nav__link--active' : ''}`}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={() => {
                setActiveSection(item.id);
                onNavigate();
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className={`site-header__toggle${menuOpen ? ' site-header__toggle--open' : ''}`}
          type="button"
          onClick={onToggle}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
        >
          <span className="site-header__toggle-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
