import { LINKS } from '@/config/links'

function Contact() {
  return (
    <footer className="contact" id="contact">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-text">
        Open to opportunities in Fintech and enterprise software.
      </p>
      <nav className="contact-nav" aria-label="Contact options">
        <a
          href={LINKS.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn contact-btn-primary"
          aria-label="LinkedIn (opens in new tab)"
        >
          LinkedIn
        </a>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn contact-btn-outline"
          aria-label="GitHub (opens in new tab)"
        >
          GitHub
        </a>
      </nav>
    </footer>
  )
}

export default Contact
