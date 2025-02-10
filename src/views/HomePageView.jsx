import styles from "../styles/HomePageView.module.css";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import HomePageController from "../controllers/HomePageController";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const HomePageView = () => {
  const navigate = useNavigate();
  const [controller] = useState(new HomePageController());
  const [isHeaderVisible, setIsHeaderVisible] = useState(
    controller.isHeaderVisible
  );
  const [visibleOptions, setVisibleOptions] = useState(
    controller.getVisibleOptions()
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    controller.init();

    const updateState = () => {
      setIsHeaderVisible(controller.isHeaderVisible);
      setVisibleOptions(controller.getVisibleOptions());
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", updateState);
    window.addEventListener("scroll", updateState);

    return () => {
      window.removeEventListener("resize", updateState);
      window.removeEventListener("scroll", updateState);
    };
  }, [controller]);

  useEffect(() => {
    let lastScrollTop = 0;
    let isScrolling = false;
  
    const handleScroll = (e) => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const isAtBottom = scrollPosition + windowHeight >= documentHeight - 10;
      const isAtTop = scrollPosition <= 10;
      const scrollDirection = scrollPosition > lastScrollTop ? "down" : "up";
  
      // Only allow scrolling at the extremes
      if (
        (scrollDirection === "down" && isAtTop) ||
        (scrollDirection === "up" && isAtBottom)
      ) {
        isScrolling = true;
        e.preventDefault(); // Prevent default scroll
  
        window.scrollTo({
          top: scrollDirection === "down" ? documentHeight : 0,
          behavior: "smooth",
        });
  
        // Reset the scroll lock after animation completes
        setTimeout(() => {
          isScrolling = false;
        }, 1500); // Adjust timeout to match your scroll animation duration
      }
  
      lastScrollTop = scrollPosition;
    };
  
    window.addEventListener("scroll", handleScroll, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: false });
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isMobile ? <Sidebar /> : <Navbar />}
      <Container
        fluid
        className={`p-0 d-flex flex-column justify-content-center align-items-center ${styles.homepageContainer}`}
      >
        {!isMobile && (
          <div className={styles.gradientBg} style={{ pointerEvents: "none" }}>
            <div
              className={styles.mainContainer}
              style={{ pointerEvents: "auto" }}
            >
              <h1>
                <span
                  className="interactive_visual roboto-bold"
                  style={{ position: "relative", zIndex: 10 }}
                >
                  An interactive visual
                </span>
                <br />
                <span
                  className="roboto-bold"
                  style={{ position: "relative", zIndex: 10 }}
                >
                  way to learn
                </span>
              </h1>
              <div
                className={styles.content}
                style={{ position: "relative", zIndex: 1000 }}
              >
                <div className={styles.logoContainer}>
                  <img
                    src={logo}
                    className={styles.logo}
                    style={{
                      position: "relative",
                      zIndex: 20,
                      height: "10rem",
                    }}
                    alt="Logo"
                  />
                </div>
                <div
                  className={styles.scrollIndicator}
                  onClick={handleScrollDown}
                  style={{
                    position: "relative",
                    zIndex: 1000,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "64px",
                    height: "64px",
                    pointerEvents: "auto",
                  }}
                >
                  <ArrowDownwardIcon
                    style={{
                      color: "var(--cryptolab-orange)",
                      marginTop: "10px",
                      fontSize: "3rem",
                    }}
                  />
                </div>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                    result="goo"
                  />
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
        )}
      </Container>
      <div className="vh-100 d-flex align-items-center">
        <Container
          className={`${styles.optionsContainer} d-flex flex-column align-items-center`}
        >
          <h2
            className="text-center mt-4 mb-5"
            style={{
              fontWeight: "bold",
              fontSize: "3.5rem",
              color: "#343a40",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
              letterSpacing: "2px",
            }}
          >
            Most common
          </h2>
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            className="g-4 w-100 justify-content-center"
          >
            {visibleOptions.map((option, index) => (
              <Col
                key={index}
                className="d-flex align-items-stretch justify-content-center"
              >
                <Card
                  className={`${styles.optionBox} w-100 ${
                    styles[`option-${option.category.toLowerCase()}`]
                  }`}
                >
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="text-center">
                      {option.category}
                    </Card.Title>
                    <Card.Text className="text-center">{option.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-5">
            <Button
              variant="primary"
              style={{
                backgroundColor: "var(--cryptolab-blue)",
                borderColor: "var(--cryptolab-blue)",
                marginRight: "10px",
              }}
              onClick={() => navigate("/options")}
            >
              Show all options
            </Button>
            <Button
              variant="outline-primary"
              style={{
                color: "var(--cryptolab-orange)",
                borderColor: "var(--cryptolab-orange)",
              }}
              onClick={() => navigate("/design")}
            >
              Open Design
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HomePageView;
