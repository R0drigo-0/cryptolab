// src/controllers/HomePageController.js

import HomePageModel from '../models/HomePageModel';
import { Navigate } from 'react-router-dom';

class HomePageController {
  constructor() {
    this.model = new HomePageModel();
    this.windowWidth = window.innerWidth;
    this.isHeaderVisible = false;
    this.lastScrollTop = 0;
    this.autoScrollTriggered = false;

    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    this.headerElement = document.querySelector('.sticky-header');
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('click', this.handleClick);
  }

  handleResize() {
    this.windowWidth = window.innerWidth;
  }

  handleClick(event) {
    console.log('Clicked!', event.target.id);
    var element = event.target.id;
    if (element === 'open-design') {
      return <Navigate to="/design" />;
    }
  }

  handleScroll() {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;

    if (this.headerElement) {
      if (scrollTop >= viewportHeight * 0.4) {
        this.isHeaderVisible = true;
        this.headerElement.style.display = 'block';
      } else {
        this.isHeaderVisible = false;
        this.headerElement.style.display = 'none';
      }

      if (scrollTop > viewportHeight * 0.3 && scrollTop > this.lastScrollTop && !this.autoScrollTriggered) {
        this.autoScrollTriggered = true;
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    }

    this.lastScrollTop = scrollTop;
  }

  getVisibleOptions() {
    return this.model.getOptions(this.windowWidth);
  }
}

export default HomePageController;