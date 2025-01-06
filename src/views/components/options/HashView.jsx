import React from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { HASH_OPTIONS } from "../../constants/options";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  DropdownButton,
  Card,
} from "react-bootstrap";

const cryptojs = require("crypto-js");

const HashView = ({ option }) => {
  const notify = (text) => {
    toast.dismiss();
    toast.success(`${text} Copied to clipboard`);
  };
  const [input, setInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(option);
  const [output, setOutput] = useState("");

  const hashFunctions = {
    "MD5": (input) => cryptojs.MD5(input).toString(),
    "SHA-1": (input) => cryptojs.SHA1(input).toString(),
    "SHA-2": (input) => cryptojs.SHA256(input).toString(),
    "SHA-3": (input) => cryptojs.SHA3(input).toString(),
    "SHA-256": (input) => cryptojs.SHA256(input).toString(),
    "SHA-512": (input) => cryptojs.SHA512(input).toString(),
  };

  useEffect(() => {
    if (input === "") {
      return;
    }
    const hashFunction = hashFunctions[selectedAlgorithm];
    if (hashFunction) {
      setOutput(hashFunction(input));
    }
  }, [input, selectedAlgorithm]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
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
              <CopyToClipboard text={input} onCopy={() => notify("Input")}>
                <button className="btn btn-primary">Copy</button>
              </CopyToClipboard>
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
            {HASH_OPTIONS.map((option, index) => (
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
              <CopyToClipboard text={output} onCopy={() => notify("Output")}>
                <button className="btn btn-primary">Copy</button>
              </CopyToClipboard>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HashView;
