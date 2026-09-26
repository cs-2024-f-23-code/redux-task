import React from 'react'
import BlogCard from './BlogCard'

export default function BlogList({ blogs, onDelete, onToggleFeatured }) {
  if (!blogs.length) return <div className="empty-state"><span>⌕</span><h3>No blogs found</h3><p>Try a different search term or category.</p></div>
  return <section className="blog-grid">{blogs.map((blog) => <BlogCard key={blog.id} blog={blog} onDelete={onDelete} onToggleFeatured={onToggleFeatured} />)}</section>
}
