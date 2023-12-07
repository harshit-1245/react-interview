import React, { useState, useRef, useCallback } from 'react';
import { useBookSearch } from './useBookSearch';

function App() {
  // State for query and page number
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  // Function to handle search input change
  const handleSearch = e => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  // Custom hook for book search
  const { loading, books, hasMore, error } = useBookSearch(query, pageNumber);

  // Refs for Intersection Observer and the last book element
  const observer = useRef();
  const lastBookElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        // When the last book element is intersecting and there are more books, increment the page number
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      {/* Input for search */}
      <input type="text" value={query} onChange={handleSearch} />
      
      {/* Mapping through books */}
      {books.map((book, index) => {
        // If it's the last book element, attach ref for Intersection Observer
        if (books.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={book}>
              {book}
            </div>
          );
        } else {
          return <div key={book}>{book}</div>;
        }
      })}

      {/* Loading and error indicators */}
      <div>{loading && 'Loading....'}</div>
      <div>{error && 'Error...'}</div>
    </>
  );
}

export default App;
