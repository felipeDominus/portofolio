import { useState } from 'react'
import { BLOG_POSTS } from '@/content/blogData'
import { Section } from '@/components'

function BlogIndex() {
  if (!BLOG_POSTS.length) {
    return null
  }

  const [activeSlug, setActiveSlug] = useState(BLOG_POSTS[0]?.slug ?? null)

  return (
    <Section id="blog" title="Blog: Security, Cloud & AI">
      <div className="blog-list">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="blog-card">
            <header className="blog-card-header">
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
                      {section.body?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
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

