import styles from "../styles/HomePageView.module.css";

import React from "react";
import logo from "../assets/logo.svg";
import HomePageController from "../controllers/HomePageController";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "./components/Navbar";

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
        <Navbar />
      </div>
      <div className={`d-flex flex-column justify-content-center align-items-center ${styles.homepageContainer}`}>
        <div className={styles.animatedBackground}></div>
        <h1 className="text-center">
          An interactive visual
          <br />
          way to learn
        </h1>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <Container className={styles.optionsContainer}>
        <Row>
          {visibleOptions.map((option, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className={styles.optionBox}>
                <Card.Body>
                  <Card.Title>{option.category}</Card.Title>
                  <Card.Text>{option.name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Button variant="secondary" onClick={() => navigate("/options")}>
            Show all options
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePageView;