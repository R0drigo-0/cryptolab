// src/views/HomePageView.js
import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePageView.css';
import logo from '../logo.svg';
import HomePageController from '../controllers/HomePageController';

const HomePageView = () => {
  const [controller] = useState(new HomePageController());
  const [isHeaderVisible, setIsHeaderVisible] = useState(controller.isHeaderVisible);
  const [visibleOptions, setVisibleOptions] = useState(controller.getVisibleOptions());

  useEffect(() => {
    controller.init();

    const updateState = () => {
      setIsHeaderVisible(controller.isHeaderVisible);
      setVisibleOptions(controller.getVisibleOptions());
    };

    window.addEventListener('resize', updateState);
    window.addEventListener('scroll', updateState);

    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('scroll', updateState);
    };
  }, [controller]);

  return (
    <div>
      <div className={`sticky-header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={logo} alt="Logo" className="logo" />
            <span className="header-title">CryptoLab</span>
          </div>
          <div className="header-categories d-flex justify-content-center">
            <a href="#hash" className="mx-2">Hash</a>
            <a href="#cryptography" className="mx-2">Cryptography</a>
            <a href="#protocols" className="mx-2">Protocols</a>
            <a href="#attacks" className="mx-2">Attacks</a>
          </div>
          <button className="header-button" id="open-design">Open Design</button>
        </div>
      </div>
      <div className="homepage-container d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center text-white">An interactive visual<br />way to learn</h1>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="options-container">
        {visibleOptions.map((option, index) => (
          <div key={index} className="option-box m-2 p-3 border rounded">
            <strong>{option.category}</strong>: {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageView;