import "bootstrap/dist/css/bootstrap.min.css";

import styles from "../../styles/NavbarView.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../../assets/logo.svg";
import { Button, Container, Row, Col, Card, Nav } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Container
      className={`d-flex justify-content-between align-items-center ${styles.container}`}
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
