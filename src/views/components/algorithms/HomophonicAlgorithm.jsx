import React from "react";
import { toast } from "react-toastify";

class HomophonicAlgorithm {
  constructor(setParams) {
    this.setParams = setParams;
    this.params = {};
  }

  getInputs(params) {
    return (
      <div className="homophonic-inputs">
        <label>
          Key (e.g., "a:1" or "a:1,b:2,c:3"):
          <input
            type="text"
            value={params.key || ""}
            onChange={(e) => this.handleInputChange(e, "key")}
            placeholder="Enter key pairs (e.g., a:1 or a:1,b:2)"
          />
        </label>
        <label>
          Message:
          <input
            type="text"
            value={params.message || ""}
            onChange={(e) => this.handleInputChange(e, "message")}
            placeholder="Enter message to encrypt"
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
      encryptedMessage: field === "key" || field === "message" ? "" : prevParams.encryptedMessage,
      decryptedMessage: field === "key" || field === "encryptedMessage" ? "" : prevParams.decryptedMessage,
    }));
  }

  validateParams(params) {
    const { key } = params;

    if (key) {
      if (!this.isValidKey(key)) {
        toast.error("Key must be in the format 'char:number' or 'char1:number1,char2:number2,...'. Each character must map to a unique number.");
        this.setParams(prevParams => ({ ...prevParams, key: "", encryptedMessage: "", decryptedMessage: "" }));
        return false;
      }
    }
    return true;
  }

  isValidKey(key) {
    try {
      const keyPairs = key.split(",").map(pair => pair.trim());
      const keyMap = {};

      for (let pair of keyPairs) {
        const [char, value] = pair.split(":").map(item => item.trim());
        if (!char || !value || isNaN(value)) return false; // Ensure char exists and value is a number
        if (keyMap[char]) return false; // Ensure no duplicate chars
        keyMap[char] = value;
      }

      return Object.keys(keyMap).length > 0; // Ensure at least one valid pair
    } catch (error) {
      return false;
    }
  }

  encrypt(params) {
    if (!this.validateParams(params)) return;

    const { key, message } = params;

    if (!key || !message) {
      toast.error("Both key and message are required for encryption.");
      return;
    }

    const keyMap = this.parseKey(key);
    const encryptedMessage = this.homophonicEncrypt(keyMap, message);
    this.setParams(prevParams => ({ ...prevParams, encryptedMessage }));
    toast.success("Message encrypted successfully!");
    return encryptedMessage;
  }

  decrypt(params) {
    if (!this.validateParams(params)) return;

    const { key, encryptedMessage } = params;

    if (!key || !encryptedMessage) {
      toast.error("Both key and encrypted message are required for decryption.");
      return;
    }

    const keyMap = this.parseKey(key);
    const decryptedMessage = this.homophonicDecrypt(keyMap, encryptedMessage);
    this.setParams(prevParams => ({ ...prevParams, decryptedMessage }));
    toast.success("Message decrypted successfully!");
    return decryptedMessage;
  }

  parseKey(key) {
    const keyPairs = key.split(",").map(pair => pair.trim().split(":")).filter(pair => pair.length === 2);
    const keyMap = {};
    keyPairs.forEach(([char, value]) => {
      keyMap[char] = value;
    });
    return keyMap;
  }

  homophonicEncrypt(keyMap, message) {
    return message.split("").map(char => {
      return keyMap[char.toLowerCase()] || char; // If no mapping, keep original char
    }).join("");
  }

  homophonicDecrypt(keyMap, encryptedMessage) {
    // Create reverse mapping
    const reverseKeyMap = {};
    for (let key in keyMap) {
      reverseKeyMap[keyMap[key]] = key;
    }
    return encryptedMessage.split("").map(char => {
      return reverseKeyMap[char] || char; // If no mapping, keep original char
    }).join("");
  }
}

export default HomophonicAlgorithm;
