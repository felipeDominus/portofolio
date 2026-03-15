import {
  Hero,
  Navbar,
  JobCard,
  ProjectCard,
  Contact,
  Section,
  SkillBadge,
} from '@/components'
import {
  JOBS,
  CONTRIBUTIONS,
  SKILL_GROUPS,
  PROJECTS,
  EDUCATION,
  COURSES,
  LANGUAGES,
  ADDITIONAL_INFO,
  SUMMARY_TEXT,
} from '@/data/portfolio'
import { LINKS } from '@/config/links'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="portfolio">
        <Navbar />
        <Hero />

      <Section id="summary" title="Professional Summary">
        <p>{SUMMARY_TEXT}</p>
      </Section>

      <Section id="contributions" title="Key Contributions">
        <div className="contrib-list">
          {CONTRIBUTIONS.map((c, i) => (
            <div key={i} className="contrib-card">
              <strong>{c.label}</strong>
              {c.text}
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Professional Experience">
        {JOBS.map((job, i) => (
          <JobCard
            key={i}
            company={job.company}
            role={job.role}
            dates={job.dates}
            domain={job.domain}
            items={job.items}
          />
        ))}
      </Section>

      <Section id="skills" title="Technical Skills">
        {SKILL_GROUPS.map((group, i) => (
          <div key={i} className="skill-group">
            <p className="skill-group-label">{group.label}</p>
            <div className="skills-grid">
              {group.skills.map((skill, j) => (
                <SkillBadge key={j}>{skill}</SkillBadge>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section id="education" title="Education">
        {EDUCATION.map((edu, i) => (
          <article key={i} className="edu-card">
            <h3>{edu.degree}</h3>
            <p className="edu-dates">{edu.institution} · {edu.dates}</p>
            <p>{edu.focus}</p>
          </article>
        ))}
      </Section>

      <Section id="development" title="Professional Development">
        <ul className="courses-list">
          {COURSES.map((course, i) => (
            <li key={i}>{course}</li>
          ))}
        </ul>
      </Section>

      <Section id="languages" title="Languages">
        <div className="lang-grid">
          {LANGUAGES.map((lang, i) => (
            <span key={i} className="lang-item">
              <strong>{lang.name}:</strong> {lang.level}
            </span>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Side Projects">
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={i}
            title={p.title}
            href={p.href}
            description={p.description}
            tech={p.tech}
          />
        ))}
        <a href={LINKS.githubRepos} target="_blank" rel="noopener noreferrer" className="more-link" aria-label="View all repositories (opens in new tab)">
          View all repositories →
        </a>
      </Section>

      <Section id="info" title="Additional Information">
        <ul className="info-list">
          {ADDITIONAL_INFO.map((item, i) => (
            <li key={i}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ul>
      </Section>

      <Contact />
      </main>
    </>
  )
}

export default App
