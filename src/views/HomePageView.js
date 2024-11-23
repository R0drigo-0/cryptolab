import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePageView.css'; // Import the custom CSS file
import logo from '../logo.svg'; // Import the logo

const options = [
  { category: 'Hash', name: 'SHA-256' },
  { category: 'Hash', name: 'MD5' },
  { category: 'Cryptography', name: 'RSA' },
  { category: 'Cryptography', name: 'AES' },
  { category: 'Cryptography', name: 'ElGamal' },
  { category: 'Protocol', name: 'TLS' },
  { category: 'Protocol', name: 'Digital Envelope' },
  { category: 'Attack', name: 'SQL Injection' },
];

const HomePageView = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollPosition = scrollTop + window.innerHeight;
      const triggerPosition = window.innerHeight * 0.8;

      if (scrollPosition >= triggerPosition && scrollTop > lastScrollTop) {
        setIsHeaderVisible(true);
      } else if (scrollTop < lastScrollTop) {
        setIsHeaderVisible(false);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const getVisibleOptions = () => {
    if (windowWidth >= 1200) return options;
    if (windowWidth >= 992) return options.slice(0, 6);
    return options.slice(0, 4);
  };

  return (
    <div>
      <div className={`sticky-header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="logo" />
          <span className="header-title">CryptoLab</span>
        </div>
        <div className="header-categories">
          <a href="#hash">Hash</a>
          <a href="#cryptography">Cryptography</a>
          <a href="#protocols">Protocols</a>
          <a href="#attacks">Attacks</a>
        </div>
        <button className="header-button">Open Design</button>
      </div>
      <div className="homepage-container d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center text-white">An interactive visual<br />way to learn</h1>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="options-container">
        {getVisibleOptions().map((option, index) => (
          <div key={index} className="option-box m-2 p-3 border rounded">
            <strong>{option.category}</strong>: {option.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageView;