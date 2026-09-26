import React from 'react'

export default function SearchBar({ inputRef, searchText, selectedCategory, categories, onSearchChange, onCategoryChange }) {
  return (
    <section className="filters" aria-label="Blog filters">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input ref={inputRef} value={searchText} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search posts, authors, or topics..." />
      </label>
      <label className="category-select">
        <span>Category</span>
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </label>
    </section>
  )
}
