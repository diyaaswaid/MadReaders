import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import SearchResults from './SearchResults';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/search" element={<SearchResults />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
