import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../../styles/NavbarView.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Button, Container, Row, Col, Card, Nav } from "react-bootstrap";

const Navbar = ({forceVisible}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (forceVisible) {
      setIsVisible(true);
      return;
    }
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(true);
    } else {
      // Scrolling up
      setIsVisible(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

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
        variant="primary"
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
