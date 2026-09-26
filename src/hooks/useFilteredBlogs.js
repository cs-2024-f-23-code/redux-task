import { useMemo } from 'react'

export function useFilteredBlogs(blogs, searchText, selectedCategory) {
  return useMemo(() => {
    const query = searchText.trim().toLowerCase()
    return blogs.filter((blog) => {
      const matchesSearch = !query || [blog.title, blog.author, blog.category]
        .some((value) => value.toLowerCase().includes(query))
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [blogs, searchText, selectedCategory])
}
