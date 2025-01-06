import "../styles/HomePageView.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import logo from "../assets/logo.svg";
import HomePageController from "../controllers/HomePageController";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const HomePageView = () => {
  const navigate = useNavigate();
  const [controller] = useState(new HomePageController());
  const [isHeaderVisible, setIsHeaderVisible] = useState(
    controller.isHeaderVisible
  );
  const [visibleOptions, setVisibleOptions] = useState(
    controller.getVisibleOptions()
  );

  useEffect(() => {
    controller.init();

    const updateState = () => {
      setIsHeaderVisible(controller.isHeaderVisible);
      setVisibleOptions(controller.getVisibleOptions());
    };

    window.addEventListener("resize", updateState);
    window.addEventListener("scroll", updateState);

    return () => {
      window.removeEventListener("resize", updateState);
      window.removeEventListener("scroll", updateState);
    };
  }, [controller]);

  return (
    <div>
      <div
        className={`sticky-header ${isHeaderVisible ? "visible" : "hidden"}`}
      >
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
      <div className="homepage-container d-flex flex-column justify-content-center align-items-center">
        <div className="animated-background"></div>
        <h1 className="text-center">
          An interactive visual
          <br />
          way to learn
        </h1>
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <Container className="options-container">
        <Row>
          {visibleOptions.map((option, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="option-box">
                <Card.Body>
                  <Card.Title>{option.category}</Card.Title>
                  <Card.Text>{option.name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/options");
            }}
          >
            Show all options
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePageView;
