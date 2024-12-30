import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Dropdown, DropdownButton, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { CRYPTOGRAPHY_OPTIONS } from "../../constants/options";

const CryptographyView = ({ option }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(option || CRYPTOGRAPHY_OPTIONS[0]);
  const [output, setOutput] = useState("");

  const cryptojs = require("crypto-js");

  const cryptoFunctions = {
    "AES": (input, key) => cryptojs.AES.encrypt(input, key).toString(),
    "DES": (input, key) => cryptojs.DES.encrypt(input, key).toString(),
    "RSA": (input) => "RSA encryption not implemented",
    "ELGamal": (input) => "ELGamal encryption not implemented",
    "Diffie-Hellman": (input) => "Diffie-Hellman encryption not implemented",
    "ECB": (input) => "ECB encryption not implemented",
    "CBC": (input) => "CBC encryption not implemented",
    "PCBC": (input) => "PCBC encryption not implemented",
    "CFB": (input) => "CFB encryption not implemented",
    "Caesar": (input) => "Caesar encryption not implemented",
    "Homophonic": (input) => "Homophonic encryption not implemented",
    "Polyalphabetic": (input) => "Polyalphabetic encryption not implemented",
    "Matrix Cipher": (input) => "Matrix Cipher encryption not implemented",
  };

  useEffect(() => {
    if (input === "" || key === "") {
      return;
    }
    const cryptoFunction = cryptoFunctions[selectedAlgorithm];
    if (cryptoFunction) {
      setOutput(cryptoFunction(input, key));
    }
  }, [input, key, selectedAlgorithm]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
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
              <Form.Group controlId="keyText">
                <Form.Label>Key</Form.Label>
                <Form.Control
                  type="text"
                  value={key}
                  onChange={handleKeyChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={12}
          md={4}
          className="d-flex align-items-center justify-content-center"
        >
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
                <Form.Control as="textarea" rows={10} value={output} readOnly />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CryptographyView;