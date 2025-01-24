import React from "react";
import "./contact.css";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa"; // Import icons from react-icons

function Contact() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">speakX</div>
        <nav>
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="login">Login</a></li>
            <li><a href="contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="contact-box">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <a href="mailto:support@mywebsite.com">sashanklpu04@gmail.com</a>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="icon" />
            <a href="tel:+1234567890">+91 93368-20227</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
