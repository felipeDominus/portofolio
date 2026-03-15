function JobCard({ company, role, dates, domain, items }) {
  return (
    <article className="job-card">
      <div className="job-header">
        <h3 className="job-role">{role}</h3>
        <p className="job-company">{company}</p>
        <p className="job-meta">
          {dates}
          {domain && <span className="job-domain"> · {domain}</span>}
        </p>
      </div>
      <ul className="job-list">
        {items.map((item, i) => (
          <li key={i}>
            {typeof item === 'string' ? item : <><strong>{item.label}:</strong> {item.text}</>}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default JobCard
