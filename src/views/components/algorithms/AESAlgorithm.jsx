import React from "react";
import { toast } from "react-toastify";

class AESAlgorithm {
  constructor(setParams) {
    this.setParams = setParams;
    this.params = {};
  }

  calculate(params) {
    const {numInputText} = params;
  }

  getInputs(params) {
    return (
      <div>
        <label>
          Key:
          <input
            type="text"
            value={params.key || ""}
            onChange={(e) => this.handleInputChange(e, 'key', params)}
            onBlur={() => this.validateParams('key', params)}
          />
        </label>
        <label>
          IV:
          <input
            type="text"
            value={params.iv || ""}
            onChange={(e) => this.handleInputChange(e, 'iv', params)}
            onBlur={() => this.validateParams('iv', params)}
          />
        </label>
        <label>
          Mode:
          <select
            value={params.mode || "CBC"}
            onChange={(e) => this.handleInputChange(e, 'mode', params)}
          >
            <option value="ECB">ECB</option>
            <option value="CBC">CBC</option>
            <option value="CFB">CFB</option>
            <option value="OFB">OFB</option>
            <option value="CTR">CTR</option>
            <option value="GCM">GCM</option>
          </select>
        </label>
        <label>
          Padding:
          <select
            value={params.padding || "PKCS7"}
            onChange={(e) => this.handleInputChange(e, 'padding', params)}
          >
            <option value="PKCS7">PKCS7</option>
            <option value="ZeroPadding">Zero Padding</option>
            <option value="ISO10126">ISO 10126</option>
          </select>
        </label>
      </div>
    );
  }

  handleInputChange(e, key, params) {
    const value = e.target.value;
    this.setParams({ ...params, [key]: value });
  }

  validateParams(key, params) {
    if (key === 'key' && params.key) {
      if (params.key.length !== 16 && params.key.length !== 24 && params.key.length !== 32) {
        toast.error("Key must be 128, 192, or 256 bits long.");
      }
    }
    if (key === 'iv' && params.iv) {
      if (params.iv.length !== 16) {
        toast.error("IV must be 128 bits long.");
      }
    }
    if (key === 'mode' && params.mode) {
      const validModes = ["ECB", "CBC", "CFB", "OFB", "CTR", "GCM"];
      if (!validModes.includes(params.mode)) {
        toast.error("Invalid mode selected.");
      }
    }
    if (key === 'padding' && params.padding) {
      const validPaddings = ["PKCS7", "ZeroPadding", "ISO10126"];
      if (!validPaddings.includes(params.padding)) {
        toast.error("Invalid padding selected.");
      }
    }
  }
}

export default AESAlgorithm;