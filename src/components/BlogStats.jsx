import React from 'react'

export default function BlogStats({ total, featured, shown }) {
  return (
    <section className="stats" aria-label="Blog statistics">
      <div><span>All posts</span><strong>{total}</strong></div>
      <div><span>Featured</span><strong>{featured}</strong></div>
      <div><span>Showing</span><strong>{shown}</strong></div>
    </section>
  )
}
