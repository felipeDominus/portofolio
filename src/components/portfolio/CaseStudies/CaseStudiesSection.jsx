import { Section } from '@/components'
import { CASE_STUDIES } from '@/content/caseStudies'

function CaseStudiesSection() {
  if (!CASE_STUDIES.length) {
    return null
  }

  return (
    <Section id="case-studies" title="Case Studies">
      <div className="case-grid">
        {CASE_STUDIES.map((cs) => (
          <article key={cs.id} className="case-card">
            <header className="case-card-header">
              <h3 className="case-card-title">{cs.title}</h3>
              <p className="case-card-meta">
                <span>{cs.role}</span>
                {cs.domain ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{cs.domain}</span>
                  </>
                ) : null}
              </p>
            </header>
            <p className="case-card-problem">
              <strong>Problem:</strong> {cs.problem}
            </p>
            {cs.approach?.length ? (
              <div className="case-card-section">
                <p className="case-card-label">Approach</p>
                <ul>
                  {cs.approach.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {cs.results?.length ? (
              <div className="case-card-section">
                <p className="case-card-label">Results</p>
                <ul>
                  {cs.results.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  )
}

export default CaseStudiesSection

