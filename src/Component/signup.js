import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
      });

      if (response.data === 'Matched') {
        window.location.href = '/';  
      } else {
        setError('Username or password did not match.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to sign up. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <header className="header">
        <nav className="nav">
          <h1 className="h1">speakX</h1>
          <ul className="ul">
            <li className="li"><a href="/" className="link">Home</a></li>
            <li className="li"><a href="about" className="link">About</a></li>
            <li className="li"><a href="contact" className="link">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="form-container">
        <h2 className="form-heading">Sign Up</h2>
        <form id="signupForm" onSubmit={handleSubmit}>
          <label htmlFor="username" className="label">Enter the registered name</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            className="input" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />

          <label htmlFor="password" className="label">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          {error && <p className="error">{error}</p>}

          <button 
            type="submit" 
            className="button"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="links">
          <a href="forgot.html" className="link-text">Forgot Password?</a>
          <p className="link-text">Don't have an account? <a href="login" className="link-hover-text">Create here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
