import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  DropdownButton,
  Card,
  Button,
} from "react-bootstrap";
import { CRYPTOGRAPHY_OPTIONS } from "../../constants/options";
import Navbar from "../Navbar";

const CryptographyView = ({ option }) => {
  const [secretKey, setSecretKey] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encrypt");
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(option);

  const cryptojs = require("crypto-js");
  const forge = require("node-forge");

  const generateRSAKeyPair = () => {
    return new Promise((resolve, reject) => {
      forge.pki.rsa.generateKeyPair(2048, (err, keypair) => {
        if (err) {
          reject(err);
        } else {
          resolve(keypair);
        }
      });
    });
  };

  const rsaKeyPair = generateRSAKeyPair();
  const rsaPublicKey = rsaKeyPair.publicKey;
  const rsaPrivateKey = rsaKeyPair.privateKey;

  const cryptoFunctions = {
    AES: {
      encrypt: (input, key) => cryptojs.AES.encrypt(input, key).toString(),
      decrypt: (input, key) =>
        cryptojs.AES.decrypt(input, key).toString(cryptojs.enc.Utf8),
    },
    DES: {
      encrypt: (input, key) => cryptojs.DES.encrypt(input, key).toString(),
      decrypt: (input, key) =>
        cryptojs.DES.decrypt(input, key).toString(cryptojs.enc.Utf8),
    },
    RSA: {
      encrypt: (input) => {
        const encrypted = rsaPublicKey.encrypt(input);
        console.log(encrypted);
        return forge.util.encode64(encrypted);
      },
      decrypt: (input) => {},
    },
    ELGamal: {
      encrypt: (input) => "ELGamal encryption not implemented",
      decrypt: (input) => "ELGamal decryption not implemented",
    },
    "Diffie-Hellman": {
      encrypt: (input) => "Diffie-Hellman encryption not implemented",
      decrypt: (input) => "Diffie-Hellman decryption not implemented",
    },
    Caesar: {
      encrypt: (input) => "Caesar encryption not implemented",
      decrypt: (input) => "Caesar decryption not implemented",
    },
    Homophonic: {
      encrypt: (input) => "Homophonic encryption not implemented",
      decrypt: (input) => "Homophonic decryption not implemented",
    },
    Polyalphabetic: {
      encrypt: (input) => "Polyalphabetic encryption not implemented",
      decrypt: (input) => "Polyalphabetic decryption not implemented",
    },
    "Matrix Cipher": {
      encrypt: (input) => "Matrix Cipher encryption not implemented",
      decrypt: (input) => "Matrix Cipher decryption not implemented",
    },
  };

  useEffect(() => {
    if (input === "" || secretKey === "") {
      return;
    }
    const cryptoFunction = cryptoFunctions[selectedAlgorithm];
    if (cryptoFunction) {
      setOutput(cryptoFunction[mode](input, secretKey));
    }
  }, [input, secretKey, selectedAlgorithm, mode]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyChange = (e) => {
    setSecretKey(e.target.value);
  };

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <>
      <Navbar forceVisible={true} />
      <div style={{ marginTop: "120px" }}>
        <Container fluid style={{ marginTop: "100px" }}>
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
                      value={secretKey}
                      onChange={handleKeyChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => handleModeChange("encrypt")}
                  >
                    Encrypt
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleModeChange("decrypt")}
                  >
                    Decrypt
                  </Button>
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
      </div>
    </>
  );
};

export default CryptographyView;
