function ProjectCard({ title, href, description, tech }) {
  return (
    <article className="project-card">
      <h3 className="project-title">
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${title} (opens in new tab)`}>
          {title}
        </a>
      </h3>
      <p className="project-desc">{description}</p>
      {tech && (
        <div className="project-tech">
          {tech.map((t, i) => (
            <span key={i} className="project-tag">{t}</span>
          ))}
        </div>
      )}
    </article>
  )
}

export default ProjectCard
