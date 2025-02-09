import styles from "../styles/HomePageView.module.css";

import React from "react";
import logo from "../assets/logo.svg";
import HomePageController from "../controllers/HomePageController";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "./components/Navbar";

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
    <>
      <Navbar />
      <div className={`d-flex flex-column justify-content-center align-items-center ${styles.homepageContainer}`}>
        <div className={styles.gradientBg}>
          <div className={styles.mainContainer}>
            <h1>
              <span className="roboto-bold">An</span>
              <span className="interactive_visual roboto-bold">interactive visual</span>
              <br />
              <span className="roboto-bold">way to learn</span>
            </h1>
            <div className={styles.content}>
              <div className={styles.logoContainer}>
                <img src={logo} className={styles.logo} />
              </div>
              <div className={styles.scrollIndicator}>
                <ArrowDownwardIcon />
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className={styles.gradientsContainer}>
            <div className={styles.g1}></div>
            <div className={styles.g2}></div>
            <div className={styles.g3}></div>
          </div>
        </div>
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
    </>
  );
};

export default HomePageView;