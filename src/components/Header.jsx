import React from 'react'

export default function Header({ onAddClick }) {
  return (
    <header className="header">
      <a className="brand" href="#top" aria-label="BlogBoard home"><span>✦</span> BlogBoard</a>
      <button className="add-button" onClick={onAddClick}>+ New blog</button>
    </header>
  )
}
