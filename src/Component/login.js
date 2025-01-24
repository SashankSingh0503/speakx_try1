import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";  

const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reg, setReg] = useState('');

  const handleButtonHover = (e) => {
    e.target.classList.add('button-hover');
  };

  const handleButtonLeave = (e) => {
    e.target.classList.remove('button-hover');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send as JSON
    const data = {
      name,
      phone,
      email,
      password,
      reg,
    };

    try {
      const response = await axios.post('http://localhost:5000/newUserDetail', data, {
        headers: {
          'Content-Type': 'application/json',  
        },
      });

      if (response.data === 'Otp generated') {
        alert('Otp sent to registered email id.');
        window.location.href = '/otp';  
      } else {
        alert('Error: User not saved');
      }
    } catch (error) {
      console.error('Error during API call', error);
      alert('There was an error. Please try again.');
    }
  };

  return (
    <div className="signin-body">
      <div className="form-container">
        <h2 className="form-heading">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="label">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="phone" className="label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="email" className="label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="reg" className="label">Registration Number</label>
          <input
            type="number"
            id="reg"
            name="reg"
            className="input"
            value={reg}
            onChange={(e) => setReg(e.target.value)}
          />

          <button
            type="submit"
            className="button"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Create Account
          </button>
        </form>

        <div className="links">
          <p className="text-center">
            Already have an account?{' '}
            <a href="signup" className="link">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
