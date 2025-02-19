import React from "react";
import { toast } from "react-toastify";

class MatrixCipherAlgorithm {
  constructor(setParams) {
    this.setParams = setParams;
    this.params = {};
  }

  getInputs(params) {
    return (
      <div className="matrix-cipher-inputs">
        <label>
          Key Matrix (e.g., "1,2;3,4" for 2x2 matrix):
          <input
            type="text"
            value={params.keyMatrix || ""}
            onChange={(e) => this.handleInputChange(e, "keyMatrix")}
            onBlur={() => this.validateParams(params)}
            placeholder="Enter matrix (e.g., 1,2;3,4)"
          />
        </label>
        <label>
          Message:
          <input
            type="text"
            value={params.message || ""}
            onChange={(e) => this.handleInputChange(e, "message")}
            placeholder="Enter message (e.g., ABC)"
          />
        </label>
        <div>
          <label>
            Encrypted Message:
            <input
              type="text"
              value={params.encryptedMessage || ""}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Decrypted Message:
            <input
              type="text"
              value={params.decryptedMessage || ""}
              readOnly
            />
          </label>
        </div>
        <button onClick={() => this.encrypt(params)}>Encrypt</button>
        <button onClick={() => this.decrypt(params)}>Decrypt</button>
      </div>
    );
  }

  handleInputChange(e, field) {
    const value = e.target.value;
    this.setParams(prevParams => ({
      ...prevParams,
      [field]: value,
      encryptedMessage:
        field === "keyMatrix" || field === "message" ? "" : prevParams.encryptedMessage,
      decryptedMessage:
        field === "keyMatrix" || field === "encryptedMessage" ? "" : prevParams.decryptedMessage,
    }));
  }

  // Modified validateParams: only shows an error without clearing the key matrix.
  validateParams(params) {
    const { keyMatrix } = params;

    if (keyMatrix && !this.isValidKeyMatrix(keyMatrix)) {
      toast.error("Key Matrix must be a valid square matrix (e.g., '1,2;3,4' for 2x2). All values must be numbers.");
      return false;
    }
    return true;
  }

  isValidKeyMatrix(keyMatrix) {
    try {
      const matrix = this.parseKeyMatrix(keyMatrix);
      if (matrix.length === 0 || !matrix.every(row => row.length === matrix.length)) {
        return false; // Ensure it's square
      }
      return matrix.every(row => row.every(val => !isNaN(val) && val !== ""));
    } catch (error) {
      return false;
    }
  }

  encrypt(params) {
    if (!this.validateParams(params)) return;

    const { keyMatrix, message } = params;

    if (!keyMatrix || !message) {
      toast.error("Both key matrix and message are required for encryption.");
      return;
    }

    const matrix = this.parseKeyMatrix(keyMatrix);
    const encryptedMessage = this.matrixEncrypt(matrix, message.toUpperCase());
    this.setParams(prevParams => ({ ...prevParams, encryptedMessage }));
    toast.success("Message encrypted successfully!");
    return encryptedMessage;
  }

  decrypt(params) {
    if (!this.validateParams(params)) return;

    const { keyMatrix, encryptedMessage } = params;

    if (!keyMatrix || !encryptedMessage) {
      toast.error("Both key matrix and encrypted message are required for decryption.");
      return;
    }

    const matrix = this.parseKeyMatrix(keyMatrix);
    const decryptedMessage = this.matrixDecrypt(matrix, encryptedMessage);
    this.setParams(prevParams => ({ ...prevParams, decryptedMessage }));
    toast.success("Message decrypted successfully!");
    return decryptedMessage;
  }

  parseKeyMatrix(keyMatrix) {
    const rows = keyMatrix.split(";").map(row => row.split(",").map(Number));
    return rows;
  }

  matrixEncrypt(matrix, message) {
    const messageVector = message.split("").map(char => {
      if (char.match(/[A-Z]/)) return char.charCodeAt(0) - 65;
      if (char === " ") return 26;
      return -1;
    }).filter(val => val >= 0);

    if (messageVector.length === 0 || messageVector.length % matrix.length !== 0) {
      toast.error("Message length must be compatible with matrix size for encryption.");
      return "";
    }

    const blockSize = matrix.length;
    const blocks = [];
    for (let i = 0; i < messageVector.length; i += blockSize) {
      blocks.push(messageVector.slice(i, i + blockSize));
    }

    const encryptedBlocks = blocks.map(block => this.multiplyMatrixVector(matrix, block));
    const encryptedVector = [].concat(...encryptedBlocks);
    return encryptedVector.map(num => String.fromCharCode(num % 27 + 65)).join("");
  }

  matrixDecrypt(matrix, encryptedMessage) {
    const encryptedVector = encryptedMessage.split("").map(char => char.charCodeAt(0) - 65);

    if (encryptedVector.length === 0 || encryptedVector.length % matrix.length !== 0) {
      toast.error("Encrypted message length must be compatible with matrix size for decryption.");
      return "";
    }

    const inverseMatrix = this.inverseMatrix(matrix);
    if (!inverseMatrix) {
      toast.error("Key matrix is not invertible. Encryption/decryption not possible.");
      return "";
    }

    const blockSize = matrix.length;
    const blocks = [];
    for (let i = 0; i < encryptedVector.length; i += blockSize) {
      blocks.push(encryptedVector.slice(i, i + blockSize));
    }

    const decryptedBlocks = blocks.map(block => this.multiplyMatrixVector(inverseMatrix, block));
    const decryptedVector = [].concat(...decryptedBlocks);
    return decryptedVector.map(num => {
      if (num === 26) return " ";
      return String.fromCharCode(num % 27 + 65);
    }).join("");
  }

  multiplyMatrixVector(matrix, vector) {
    if (matrix[0].length !== vector.length) {
      throw new Error("Matrix and vector dimensions do not match.");
    }

    return matrix.map(row =>
      row.reduce((sum, value, index) => sum + value * vector[index], 0) % 27
    );
  }

  inverseMatrix(matrix) {
    if (matrix.length !== 2 || matrix[0].length !== 2) {
      toast.error("Only 2x2 matrices are supported for this implementation.");
      return null;
    }

    const [[a, b], [c, d]] = matrix;
    const det = a * d - b * c;

    if (det === 0) return null;

    const invDet = this.modInverse(det, 27);
    if (invDet === -1) return null;

    return [
      [d * invDet % 27, (-b + 27) % 27],
      [(-c + 27) % 27, a * invDet % 27]
    ];
  }

  modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0, x1 = 1;

    if (m === 1) return 0;

    while (a > 1) {
      q = Math.floor(a / m);
      t = m;

      m = a % m;
      a = t;
      t = x0;

      x0 = x1 - q * x0;
      x1 = t;
    }

    if (x1 < 0) x1 += m0;
    return x1;
  }
}

export default MatrixCipherAlgorithm;