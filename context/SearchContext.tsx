'use client'

// /context/SearchContext.tsx
import { createContext, useContext, useState } from 'react'

interface SearchContextType {
  searchQuery: string
  updateSearchQuery: (query: string) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <SearchContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}