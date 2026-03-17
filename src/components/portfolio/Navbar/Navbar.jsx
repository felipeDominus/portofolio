import { useState } from 'react'
import { NAV_ITEMS } from '@/config/nav'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen((open) => !open)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-brand">
          Felipe Silva de Mello
        </a>
        <button
          type="button"
          className="navbar-menu-button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          onClick={handleToggle}
        >
          <span className="navbar-menu-icon" aria-hidden="true">
            {isOpen ? '×' : '☰'}
          </span>
          <span className="navbar-menu-label">Menu</span>
        </button>
        <nav
          className={`navbar-nav ${isOpen ? 'navbar-nav-open' : ''}`}
          aria-label="Page sections"
          id="navbar-menu"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navbar-link ${item.primary ? 'navbar-link-primary' : ''}`}
              onClick={handleLinkClick}
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
