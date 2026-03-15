function Section({ id, title, children, className = '' }) {
  return (
    <section
      id={id}
      className={`section ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      {title && (
        <h2 id={id ? `${id}-heading` : undefined} className="section-title">
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}

export default Section
