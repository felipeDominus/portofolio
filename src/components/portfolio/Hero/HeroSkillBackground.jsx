import skillLogosData from '@/data/skillLogosData.json'

/**
 * Renders a grid of skill logos (from Simple Icons data) as the hero background.
 * Scalable SVG, high quality, covers your tech stack. No external image.
 */
export function HeroSkillBackground() {
  return (
    <div className="hero-skill-bg" aria-hidden="true">
      <div className="hero-skill-bg-grid">
        {skillLogosData.flatMap((icon, i) =>
          [0, 1, 2, 3, 4].map((j) => (
            <span
              key={`${i}-${j}`}
              className="hero-skill-bg-item"
              style={{ '--skill-color': `#${icon.h}` }}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <title>{icon.t}</title>
                <path d={icon.p} fill="currentColor" />
              </svg>
            </span>
          ))
        )}
      </div>
    </div>
  )
}
