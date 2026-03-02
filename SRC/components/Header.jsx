function Header({ menuOpen, navigationItems, onNavigate, onToggle }) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="site-header__brand">
          <p className="site-header__name">Marco Antonio Rulfo Castro</p>
          <p className="site-header__role">Desarrollador web full stack y especialista en TI</p>
        </div>

        <nav className={`site-nav${menuOpen ? ' site-nav--open' : ''}`} aria-label="Secciones principales">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              className="site-nav__link"
              href={`#${item.id}`}
              onClick={onNavigate}
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
