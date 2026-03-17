import { LINKS } from '@/config/links'

function Contact() {
  return (
    <footer className="contact" id="contact">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-text">
        I partner with banks, fintechs, and regulated businesses to design secure
        architectures and AI-powered automations that reduce risk and unlock new
        revenue. The best way to reach me is via LinkedIn—send a short message
        about your context and what you&apos;d like to explore.
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
      <p className="contact-disclaimer">
        All content and examples on this site and blog reflect my personal views
        and experience only. They do not represent, describe, or disclose any
        confidential information about my current or past employers or clients.
      </p>
    </footer>
  )
}

export default Contact
