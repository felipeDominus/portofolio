import { useState, useMemo } from 'react'
import { BLOG_POSTS } from '@/content/blogData'
import { Section } from '@/components'

const CATEGORY_ALL = 'All'

function BlogIndex() {
  const [activeSlug, setActiveSlug] = useState(BLOG_POSTS[0]?.slug ?? null)
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL)

  const categories = useMemo(
    () =>
      [CATEGORY_ALL, ...Array.from(new Set(BLOG_POSTS.map((p) => p.category).filter(Boolean))).sort()],
    [],
  )

  const filteredPosts = useMemo(
    () =>
      selectedCategory === CATEGORY_ALL
        ? BLOG_POSTS
        : BLOG_POSTS.filter((p) => p.category === selectedCategory),
    [selectedCategory],
  )

  if (!BLOG_POSTS.length) {
    return null
  }

  return (
    <Section id="blog" title="Blog: Security, Cloud & AI">
      <p className="blog-topic-summary">
        AI security, cloud & microservices, secure dev tooling, Kubernetes/DevOps
      </p>
      <p className="blog-disclaimer" role="note">
        Everything on this blog is my personal opinion only. It is not affiliated
        with, endorsed by, or reflective of my employer or any client. Nothing
        here is intended to criticise or imply wrongdoing by any organisation I
        work with or have worked with.
      </p>
      <nav className="blog-categories" aria-label="Blog categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`blog-category-btn ${selectedCategory === cat ? 'blog-category-btn-active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat)
              setActiveSlug(null)
            }}
            aria-pressed={selectedCategory === cat}
          >
            {cat}
          </button>
        ))}
      </nav>
      <div className="blog-list">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="blog-card">
            <header className="blog-card-header">
              {post.category ? (
                <span className="blog-card-category" aria-label="Category">
                  {post.category}
                </span>
              ) : null}
              <p className="blog-card-meta">
                <span>{new Date(post.date).toLocaleDateString('en-IE')}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </p>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
            </header>
            {post.tags?.length ? (
              <div className="blog-card-tags" aria-label="Post tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <button
              type="button"
              className="blog-read-btn"
              onClick={() =>
                setActiveSlug((current) => (current === post.slug ? null : post.slug))
              }
            >
              {activeSlug === post.slug ? 'Hide article' : 'Read article'}
            </button>
            {activeSlug === post.slug ? (
              <article className="blog-article" aria-label={post.title}>
                <header className="blog-article-header">
                  <p className="blog-card-meta">
                    <span>{new Date(post.date).toLocaleDateString('en-IE')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </p>
                  <h3 className="blog-article-title">{post.title}</h3>
                </header>
                <div className="blog-article-body">
                  {post.sections?.map((section) => (
                    <section key={section.heading} className="blog-article-section">
                      <h4 className="blog-article-heading">{section.heading}</h4>
                      {section.body?.map((entry) =>
                        typeof entry === 'string' ? (
                          <p key={entry}>{entry}</p>
                        ) : (
                          <p key={entry.label}>
                            {entry.href ? (
                              <a
                                href={entry.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${entry.label} (opens in new tab)`}
                              >
                                {entry.label}
                              </a>
                            ) : (
                              entry.label
                            )}
                          </p>
                        ),
                      )}
                    </section>
                  ))}
                </div>
              </article>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  )
}

export default BlogIndex

