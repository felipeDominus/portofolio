import { LINKS } from '@/config/links'
import { HeroSkillBackground } from './HeroSkillBackground'

const base = import.meta.env.BASE_URL

function Hero() {
  return (
    <header className="hero" id="hero">
      <HeroSkillBackground />
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-content">
        <img
          src={`${base}profile.png`}
          alt="Felipe Silva de Mello"
          className="hero-avatar"
          width={120}
          height={120}
        />
        <p className="hero-badge">Senior Software Engineer</p>
        <h1>Felipe Silva de Mello</h1>
        <p className="hero-location">
          Swords, Dublin, Ireland · Brazilian · Irish
        </p>
        <p className="hero-summary">
          7+ years building scalable backend architectures for financial institutions.
          Java microservices · Kubernetes · DevOps automation.
        </p>
        <nav className="hero-nav" aria-label="Contact links">
          <a
            href={LINKS.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-primary"
            aria-label="LinkedIn (opens in new tab)"
          >
            LinkedIn
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-outline"
            aria-label="GitHub (opens in new tab)"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Hero
