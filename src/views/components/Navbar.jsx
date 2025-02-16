import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/NavbarView.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Button, Container } from "react-bootstrap";

const Navbar = ({ forceVisible }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(forceVisible);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = () => {
    if (forceVisible) {
      setIsVisible(true);
      return;
    }
    const currentScrollTop = window.scrollY;
    if (currentScrollTop < lastScrollTop) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }
    setLastScrollTop(currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, forceVisible]);

  return (
    <Container
      className={`min-vw-100 d-flex justify-content-between align-items-center ${
        styles.container
      } ${isVisible ? styles.visible : styles.hidden}`}
    >
      <div className="d-flex align-items-center" onClick={() => navigate("/")}>
        <img src={logo} alt="Cryptolab" className={styles.logo} />
        <span className={styles.headerTitle}>
          <span className={styles.crypto}>Crypto</span>
          <span className={styles.lab}>lab</span>
        </span>
      </div>
      <div
        className={`header-categories d-flex justify-content-center ${styles.headerCategories}`}
      >
        <a href="#hash" className="mx-2">
          Hash
        </a>
        <a href="#cryptography" className="mx-2">
          Cryptography
        </a>
        <a href="#protocols" className="mx-2">
          Protocols
        </a>
        <a href="#attacks" className="mx-2">
          Attacks
        </a>
      </div>
      <Button
        className={styles["navbar-button"]}
        onClick={() => {
          navigate("/design");
        }}
      >
        Open Design
      </Button>
    </Container>
  );
};

export default Navbar;