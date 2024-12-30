import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Dropdown, DropdownButton, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { CRYPTOGRAPHY_OPTIONS } from "../../constants/options";

const CryptographyView = () => {
  const { option } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(option || CRYPTOGRAPHY_OPTIONS[0]);
  const [output, setOutput] = useState("");

  useEffect(() => {
    setSelectedAlgorithm(option);
  }, [option]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Add logic to update output based on selected algorithm and input
  };

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    navigate(`/options/${algorithm}`);
    // Add logic to update output based on selected algorithm and input
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Form.Group controlId="inputText">
                <Form.Label>Input</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={input}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedAlgorithm}
            onSelect={handleAlgorithmSelect}
          >
            {CRYPTOGRAPHY_OPTIONS.map((option, index) => (
              <Dropdown.Item key={index} eventKey={option}>
                {option}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Form.Group controlId="outputText">
                <Form.Label>Output</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={output}
                  readOnly
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CryptographyView;