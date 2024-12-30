import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { HASH_OPTIONS, CRYPTOGRAPHY_OPTIONS } from "../constants/options";

import logo from "../logo.svg";

import "../styles/HomePageView.css";

const CloseDesignView = () => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    navigate(`/options/${option}`);
  };

  return (
    <div>
      <div className="sticky-header visible">
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
      </div>
      <Container className="options-container mt-4">
        <Row>
          <Col xs={12} className="mb-4">
            <h2>Hash</h2>
            <Row>
              {HASH_OPTIONS.map((option, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-3">
                  <Card
                    className="option-box"
                    style={{ backgroundColor: 'var(--cryptolab-orange)' }}
                    onClick={() => handleOptionClick(option)}
                  >
                    <Card.Body>
                      <Card.Text>{option}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={12} className="mb-4">
            <h2>Cryptography</h2>
            <Row>
              {CRYPTOGRAPHY_OPTIONS.map((option, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-3">
                  <Card
                    className="option-box"
                    style={{ backgroundColor: 'var(--cryptolab-blue)' }}
                    onClick={() => handleOptionClick(option)}
                  >
                    <Card.Body>
                      <Card.Text>{option}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CloseDesignView;