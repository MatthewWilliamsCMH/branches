import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
      <a
          href="https://github.com/schneibley"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
         Brad's GitHub
        </a>
        <a
          href="https://github.com/jameswhatcott"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
         James's GitHub
        </a>
        <a
          href="https://github.com/MatthewWilliamsCMH"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
         Matthew's GitHub
        </a>
        <a
          href="https://github.com/Bluf00"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
         Michael's GitHub
        </a>
        <a
          href="https://github.com/BrianMN11"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
         Brian's GitHub
        </a>
        <a
          href="https://github.com/mkeeney42?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
         Matt's GitHub
        </a>
      </div>
      <p className="footer-text">&copy; {new Date().getFullYear()} Coding better than yesterday</p>
    </footer>
  );
};

export default Footer;