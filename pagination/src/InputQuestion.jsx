import React, { useEffect, useState, useRef } from 'react';

const InputQuestion = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTitles, setSelectedTitles] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Track the current page
    const suggestionBoxRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Set loading to true when fetching data
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products?page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(prevProducts => [...prevProducts, ...data]); // Append new data to existing products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };
        fetchProducts();
    }, [page]); // Fetch products whenever page changes

    useEffect(() => {
        setSuggestions([]);
    }, [searchTerm]);

    useEffect(() => {
        if (!loading) { // Render suggestions only when loading is false
            const filteredSuggestions = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }
    }, [products, searchTerm, loading]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title);
        setSelectedTitles(prevTitles => [...prevTitles, suggestion.title]); // Add selected title to the list
        setSuggestions([]);
    };

    const handleRemoveSelectedTitle = (title) => {
        setSelectedTitles(prevTitles => prevTitles.filter(selectedTitle => selectedTitle !== title)); // Remove selected title
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = suggestionBoxRef.current;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage(prevPage => prevPage + 1); // Load more data when user reaches the bottom
        }
    };

    return (
        <div className='outerbox'>
            <div className="innerbox">
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Type something..."
                />
                <div className="suggestion-box" onScroll={handleScroll} ref={suggestionBoxRef}>
                    {loading ? ( // Show loading indicator if loading is true
                        <div>Loading...</div>
                    ) : (
                        suggestions.map((suggested, index) => (
                            <div
                                key={index}
                                className={selectedTitles.includes(suggested.title) ? 'selected' : ''}
                                onClick={() => handleSuggestionClick(suggested)}
                            >
                                {suggested.title}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="selected-titles">
                {selectedTitles.map((title, index) => (
                    <div key={index} className="selected-title" onClick={() => handleRemoveSelectedTitle(title)}>
                        {title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InputQuestion;
