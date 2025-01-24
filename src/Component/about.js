import React from "react";
import "./about.css";

function About() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">speakX</div>
        <nav>
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="about-box">
        <h2>About Us</h2>
        <p>
        SpeakX is an innovative Edtech startup aimed at revolutionizing English learning 
        for children all over the world. Our platform serves young learners by offering 
        a cutting-edge Personal AI-powered tutor that helps kids not just with speaking 
        abilities but also serves as a powerful tool for overcoming communication barriers.
         Our AI tutor uses fun and interactive conversations to help kids get language proficiency,
         nurturing the development of self-confidence crucial for their future success.
        </p>
      </div>
    </div>
  );
}

export default About;
