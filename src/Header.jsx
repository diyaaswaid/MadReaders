import React, { useState } from 'react';
import { searchBooks } from './services/googleBooksService';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        try {
            const results = await searchBooks(searchQuery);
            // Navigate to search results page or update state in parent component
            navigate('/search', { state: { results, query: searchQuery } });
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav>
                <div className="logo">MadReaders</div>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search books..."
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/categories">Categories</a>
                    <a href="/bestsellers">Best Sellers</a>
                    <div className="menu-container">
                        <button className="menu-button" onClick={toggleMenu}>
                            Menu
                        </button>
                        {isMenuOpen && (
                            <div className="dropdown-menu">
                                <a href="/login">Login</a>
                                <a href="/signup">Sign Up</a>
                                <a href="/faq">FAQ</a>
                                <a href="/contact">Contact</a>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;