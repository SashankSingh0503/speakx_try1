import React, { useState } from 'react';
import axios from 'axios';

const OTPEntry = () => {
  const [otp, setOtp] = useState([null, null, null, null]); 

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value ? parseInt(value, 10) : null;
      setOtp(newOtp);

      if (value.length === 1 && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      } else if (value.length === 0 && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpData = otp.join('');  
    const otpNumber = parseInt(otpData, 10);
    
    if (isNaN(otpNumber)) {
      alert('Please enter a valid OTP');
      return;
    }

    console.log('OTP Submitted:', otpNumber);

    try {
      const response = await axios.post('http://localhost:5000/otp', { otp: otpNumber });
      if(response.data.message === 'Account created successfully'){
        alert("Account created successfully");
        window.location.href = '/';
      }
      else{
        alert("Entered otp not matched");
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error submitting OTP:', error);
      alert('Error submitting OTP');
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      <header style={{ backgroundColor: '#1c1c1c', padding: '20px', textAlign: 'center' }}>
        <h1
          style={{
            background: 'linear-gradient(to right, orange, white)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: '2.5em',
            margin: 0,
          }}
        >
          speakX Account Verification
        </h1>

        <nav style={{ margin: '15px 0' }}>
          <a href="/" style={{ color: '#ffffff', textDecoration: 'none', margin: '0 15px', fontSize: '1.2em' }}>Home</a>
          <a href="/signup" style={{ color: '#ffffff', textDecoration: 'none', margin: '0 15px', fontSize: '1.2em' }}>Login</a>
          <a href="/" style={{ color: '#ffffff', textDecoration: 'none', margin: '0 15px', fontSize: '1.2em' }}>Contact</a>
        </nav>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}>
        <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
          <h2>Enter OTP</h2>
          <form id="otpForm" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  value={value !== null ? value : ''}
                  onChange={(e) => handleInputChange(e, index)}
                  maxLength="1"
                  id={`otp-input-${index}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    margin: '0 5px',
                    textAlign: 'center',
                    fontSize: '1.5em',
                    border: '2px solid #4caf50',
                    borderRadius: '5px',
                    backgroundColor: '#ffffff',
                    color: '#000',
                  }}
                />
              ))}
            </div>
            <br />
            <input
              type="submit"
              value="Submit"
              style={{
                backgroundColor: '#4caf50',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '1em',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s, box-shadow 0.3s',
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPEntry;
