import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';
import Footer from './footer';
const Main = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0); 
    const [expandedItem, setExpandedItem] = useState(null); 

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const fetchResults = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/search', {
                query: searchQuery,
                page: currentPage,
                limit: 10
            });

            setResponseData(response.data.results);
            setTotalResults(response.data.total); 
        } catch (err) {
            setError('Error fetching data!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            fetchResults();
        }
    }, [currentPage, searchQuery]); 

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemClick = (item) => {
        setExpandedItem(expandedItem === item ? null : item);
    };

    const totalPages = Math.ceil(totalResults / 10);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1); 
        fetchResults();
    };

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <header>
                <h1 className='h1'>speakX</h1>
                <nav>
                    <ul>
                        <a href="about"><li>About</li></a>
                        <a href="signup"><li>Login</li></a>
                        <a href="contact"><li>Contact</li></a>
                    </ul>
                </nav>
                <button onClick={toggleDarkMode}>
                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                </button>
            </header>

            <main>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Search'}
                    </button>
                </form>
                {error && <p>{error}</p>}

                <ul className="results">
                    {responseData.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleItemClick(item)} 
                            className={expandedItem === item ? 'expanded' : ''}
                        >
                            <div className="title">{item.title}</div>
                            <div className="type">{item.type}</div>
                            {expandedItem === item && (
                                <div className="details">
                                    <p><strong>ID:</strong> {item.id}</p>
                                    <p><strong>Solution:</strong> {item.solution}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Pagination */}
                {totalResults > 0 && (
                    <div className="pagination">
                        {currentPage > 1 && (
                            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                        )}
                        <span>Page {currentPage} of {totalPages}</span>
                        {currentPage < totalPages && (
                            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                        )}
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
};

export default Main;
