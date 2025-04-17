import React, { useState, useEffect } from 'react';
import { searchBooks } from './services/googleBooksService';
import './Recommendations.css';

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would come from user's browsing history or purchases
        const fetchRecommendations = async () => {
            try {
                // For demo purposes, we'll use some popular categories
                const categories = ['fiction', 'mystery', 'romance', 'science fiction'];
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                
                const results = await searchBooks('', { category: randomCategory });
                setRecommendations(results.items);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

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

    if (loading) {
        return <div className="recommendations-loading">Loading recommendations...</div>;
    }

    return (
        <section className="recommendations">
            <h2>Recommended For You</h2>
            <p className="recommendations-subtitle">Based on your interests and reading history</p>
            
            <div className="book-grid">
                {recommendations.map((book) => {
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
        </section>
    );
}

export default Recommendations; 