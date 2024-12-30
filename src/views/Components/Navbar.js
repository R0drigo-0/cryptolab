import "../../styles/HomePageView.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from "react-router-dom";
import React from "react";
import logo from "../../assets/logo.svg";
import { Button, Container, Row, Col, Card, Nav } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Container className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img src={logo} alt="Logo" className="logo" />
        <span className="header-title">CryptoLab</span>
      </div>
      <div className="header-categories d-flex justify-content-center">
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
