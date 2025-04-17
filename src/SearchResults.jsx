import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

function SearchResults() {
    const location = useLocation();
    const { results, query } = location.state || { results: { items: [] }, query: '' };

    const formatBookData = (book) => {
        const volumeInfo = book.volumeInfo || {};
        return {
            id: book.id,
            title: volumeInfo.title || 'No Title',
            author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
            coverImage: volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Cover',
            description: volumeInfo.description || 'No description available',
            publishedDate: volumeInfo.publishedDate || 'Unknown',
            averageRating: volumeInfo.averageRating || 0,
            ratingsCount: volumeInfo.ratingsCount || 0
        };
    };

    return (
        <div className="search-results-page">
            <h1>Search Results for "{query}"</h1>
            <p className="results-count">{results.totalItems} books found</p>
            
            <div className="book-grid">
                {results.items.map((book) => {
                    const formattedBook = formatBookData(book);
                    return (
                        <div key={formattedBook.id} className="book-card">
                            <img src={formattedBook.coverImage} alt={formattedBook.title} />
                            <h3>{formattedBook.title}</h3>
                            <p>{formattedBook.author}</p>
                            <div className="book-rating">
                                {Array(5).fill().map((_, i) => (
                                    <span key={i} className={i < formattedBook.averageRating ? 'filled' : ''}>
                                        ★
                                    </span>
                                ))}
                                <span>({formattedBook.ratingsCount})</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchResults; 