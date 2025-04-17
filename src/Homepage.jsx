import React, { useState, useEffect } from 'react';
import Header from './Header';
import { searchBooks, getFeaturedBooks, getBestsellers } from './services/googleBooksService';
import './Homepage.css';

function Homepage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [bestsellers, setBestsellers] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [displayedFeatured, setDisplayedFeatured] = useState(12);
    const [displayedBestsellers, setDisplayedBestsellers] = useState(12);
    const [displayedNewReleases, setDisplayedNewReleases] = useState(12);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch featured books - romance genre
                const featuredData = await searchBooks('romance', { 
                    orderBy: 'relevance',
                    maxResults: 40
                });
                
                // Fetch bestsellers - mystery genre
                const bestsellersData = await searchBooks('mystery', { 
                    orderBy: 'relevance',
                    maxResults: 40
                });
                
                // Fetch new releases - fantasy genre
                const newReleasesData = await searchBooks('fantasy', { 
                    orderBy: 'newest',
                    maxResults: 40
                });

                console.log('Featured Books:', featuredData);
                console.log('Best Sellers:', bestsellersData);
                console.log('New Releases:', newReleasesData);

                if (featuredData && featuredData.items) {
                    setFeaturedBooks(featuredData.items);
                }
                if (bestsellersData && bestsellersData.items) {
                    setBestsellers(bestsellersData.items);
                }
                if (newReleasesData && newReleasesData.items) {
                    setNewReleases(newReleasesData.items);
                }
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        fetchInitialData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const results = await searchBooks(searchQuery);
            setSearchResults(results.items || []);
        } catch (error) {
            console.error('Error searching books:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const loadMoreFeatured = () => {
        setDisplayedFeatured(prev => prev + 12);
    };

    const loadMoreBestsellers = () => {
        setDisplayedBestsellers(prev => prev + 12);
    };

    const loadMoreNewReleases = () => {
        setDisplayedNewReleases(prev => prev + 12);
    };

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
        <div className="homepage">
            <Header />
            <main>
                <section className="search-section">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for books..."
                        />
                        <button type="submit" disabled={isSearching}>
                            {isSearching ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                </section>

                {searchResults.length > 0 && (
                    <section className="search-results">
                        <h2>Search Results</h2>
                        <div className="book-grid">
                            {searchResults.map((book) => {
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
                )}

                <section className="featured-books">
                    <h2>Featured Books</h2>
                    <div className="book-grid">
                        {featuredBooks.slice(0, displayedFeatured).map((book) => {
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
                    {featuredBooks.length > displayedFeatured && (
                        <button className="load-more" onClick={loadMoreFeatured}>
                            Load More Featured Books
                        </button>
                    )}
                </section>

                <section className="bestsellers">
                    <h2>Best Sellers</h2>
                    <div className="book-grid">
                        {bestsellers.slice(0, displayedBestsellers).map((book) => {
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
                    {bestsellers.length > displayedBestsellers && (
                        <button className="load-more" onClick={loadMoreBestsellers}>
                            Load More Best Sellers
                        </button>
                    )}
                </section>

                <section className="new-releases">
                    <h2>New Releases</h2>
                    <div className="book-grid">
                        {newReleases.slice(0, displayedNewReleases).map((book) => {
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
                    {newReleases.length > displayedNewReleases && (
                        <button className="load-more" onClick={loadMoreNewReleases}>
                            Load More New Releases
                        </button>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Homepage; 