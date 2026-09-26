import React, { memo } from 'react'

function BlogCard({ blog, onDelete, onToggleFeatured }) {
  return (
    <article className="blog-card">
      <div className="card-topline">
        <span className={`category-tag ${blog.category.toLowerCase()}`}>{blog.category}</span>
        {blog.featured && <span className="featured">★ Featured</span>}
      </div>
      <h3>{blog.title}</h3>
      <p className="byline">By {blog.author}</p>
      <footer>
        <span>◷ {blog.readingTime} min read</span>
        <div className="card-actions">
          <button onClick={() => onToggleFeatured(blog.id)} aria-label={`Toggle featured for ${blog.title}`} title="Toggle featured">{blog.featured ? '★' : '☆'}</button>
          <button className="delete" onClick={() => onDelete(blog.id)} aria-label={`Delete ${blog.title}`} title="Delete blog">⌫</button>
        </div>
      </footer>
    </article>
  )
}

export default memo(BlogCard)
