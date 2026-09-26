import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import BlogList from './components/BlogList'
import BlogStats from './components/BlogStats'
import { useFilteredBlogs } from './hooks/useFilteredBlogs'
import { addBlog, deleteBlog, loadBlogs, setCategory, setSearchText, toggleFeatured } from './features/blog/blogSlice'

export default function App() {
  const dispatch = useDispatch()
  const { blogs, searchText, selectedCategory, loading, error } = useSelector((state) => state.blog)
  const searchInputRef = useRef(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', author: '', category: 'React', readingTime: 5 })
  useEffect(() => { dispatch(loadBlogs()) }, [dispatch])
  useEffect(() => { searchInputRef.current?.focus() }, [])
  const categories = useMemo(() => ['All', ...new Set(blogs.map((blog) => blog.category))], [blogs])
  const filteredBlogs = useFilteredBlogs(blogs, searchText, selectedCategory)
  const featuredCount = useMemo(() => blogs.filter((blog) => blog.featured).length, [blogs])
  const handleDelete = useCallback((id) => dispatch(deleteBlog(id)), [dispatch])
  const handleToggleFeatured = useCallback((id) => dispatch(toggleFeatured(id)), [dispatch])
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addBlog({ ...form, id: Date.now(), readingTime: Number(form.readingTime), featured: false }))
    setForm({ title: '', author: '', category: 'React', readingTime: 5 }); setShowForm(false)
  }
  return <main id="top">
    <Header onAddClick={() => setShowForm(true)} />
    <div className="page-shell">
      <section className="hero"><p className="eyebrow">CONTENT OVERVIEW</p><h1>Your blog dashboard</h1><p>Organize, search, and manage your writing in one focused place.</p></section>
      <BlogStats total={blogs.length} featured={featuredCount} shown={filteredBlogs.length} />
      <SearchBar inputRef={searchInputRef} searchText={searchText} selectedCategory={selectedCategory} categories={categories} onSearchChange={(value) => dispatch(setSearchText(value))} onCategoryChange={(value) => dispatch(setCategory(value))} />
      {loading && <div className="message loading">Loading your blogs…</div>}
      {error && <div className="message error">{error}</div>}
      {!loading && !error && <BlogList blogs={filteredBlogs} onDelete={handleDelete} onToggleFeatured={handleToggleFeatured} />}
    </div>
    {showForm && <div className="modal-backdrop"><form className="blog-form" onSubmit={handleSubmit}><div className="form-heading"><h2>Create a blog</h2><button type="button" onClick={() => setShowForm(false)}>×</button></div><label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><label>Author<input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label><div className="form-row"><label>Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>React</option><option>Redux</option><option>Node</option></select></label><label>Read time<input min="1" type="number" value={form.readingTime} onChange={(e) => setForm({ ...form, readingTime: e.target.value })} /></label></div><button className="submit-button">Add blog</button></form></div>}
  </main>
}
