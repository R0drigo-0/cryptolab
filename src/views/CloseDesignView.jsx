import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { HASH_OPTIONS, CRYPTOGRAPHY_OPTIONS } from "../constants/options";
import Navbar from "./components/Navbar";

const CloseDesignView = () => {
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    navigate(`/options/${option}`);
  };

  return (
    <div>
      <Navbar forceVisible={true} />
      <Container className="options-container mt-4">
        <Row>
          <Col xs={12} className="mb-4">
            <h2>Hash</h2>
            <Row>
              {HASH_OPTIONS.map((option, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-3">
                  <Card
                    className="option-box"
                    style={{ backgroundColor: 'var(--cryptolab-hash)' }}
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
                    style={{ backgroundColor: 'var(--cryptolab-cryptography)' }}
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