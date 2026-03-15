import { NAV_ITEMS } from '@/config/nav'

function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-brand">
          Felipe Silva de Mello
        </a>
        <nav className="navbar-nav" aria-label="Page sections">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navbar-link ${item.primary ? 'navbar-link-primary' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
