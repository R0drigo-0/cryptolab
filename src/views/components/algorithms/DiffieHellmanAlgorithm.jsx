/* global BigInt */

import React from "react";
import { toast } from "react-toastify";

class DiffieHellmanAlgorithm {
  constructor(setParams) {
    this.setParams = setParams;
    this.params = {};
  }

  getInputs(params) {
    return (
      <div>
        <label>
          Prime (p):
          <input
            type="number"
            value={params.p || ""}
            onChange={(e) => this.handleInputChange(e, "p", params)}
            onBlur={() => this.validateParams("p", params)}
          />
        </label>
        <label>
          Generator (g):
          <input
            type="number"
            value={params.g || ""}
            onChange={(e) => this.handleInputChange(e, "g", params)}
            onBlur={() => this.validateParams("g", params)}
          />
        </label>
        <label>
          Alice's Private Key (a):
          <input
            type="number"
            value={params.a || ""}
            onChange={(e) => this.handleInputChange(e, "a", params)}
            onBlur={() => this.validateParams("a", params)}
          />
        </label>
        <label>
          Bob's Private Key (b):
          <input
            type="number"
            value={params.b || ""}
            onChange={(e) => this.handleInputChange(e, "b", params)}
            onBlur={() => this.validateParams("b", params)}
          />
        </label>
        <div>
          <label>
            Alice's Public Key:
            <input
              type="text"
              value={params.A ? `${params.A}` : ""}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Bob's Public Key:
            <input
              type="text"
              value={params.B ? `${params.B}` : ""}
              readOnly
            />
          </label>
        </div>
        <div>
          <label>
            Shared Secret Key:
            <input
              type="text"
              value={params.sharedKey ? `${params.sharedKey}` : ""}
              readOnly
            />
          </label>
        </div>
      </div>
    );
  }

  handleInputChange(e, key, params) {
    const value = e.target.value;
    if (value === "") {
      this.setParams({ ...params, [key]: "" });
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        const newParams = { ...params, [key]: numValue };
        this.calculateKeys(newParams);
        this.setParams(newParams);
      }
    }
  }

  validateParams(key, params) {
    const { p, g, a, b } = params;

    if (key === "p" && p) {
      if (!this.isPrime(p)) {
        const recommendedP = this.getRandomPrime();
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error(`p must be a prime number. For example ${recommendedP}.`);
      }
    }

    if (key === "g" && g) {
      if (g <= 1 || g >= p) {
        const recommendedG = this.getRandomGenerator(p);
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error(`g must be between 1 and ${p}. For example ${recommendedG}.`);
      }
    }

    if (key === "a" && a) {
      if (a <= 1 || a >= p) {
        const recommendedA = this.getRandomPrivateKey(p);
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error(`Private key must be between 1 and ${p}. For example ${recommendedA}.`);
      }
    }

    if (key === "b" && b) {
      if (b <= 1 || b >= p) {
        const recommendedB = this.getRandomPrivateKey(p);
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error(`Private key must be between 1 and ${p}. For example ${recommendedB}.`);
      }
    }
  }

  calculateKeys(params) {
    const { p, g, a, b } = params;
    
    if (!p || !g) return params;

    let newParams = { ...params };

    // Calculate Alice's public key: A = g^a mod p
    if (a) {
      newParams.A = this.modExp(BigInt(g), BigInt(a), BigInt(p));
    }

    // Calculate Bob's public key: B = g^b mod p
    if (b) {
      newParams.B = this.modExp(BigInt(g), BigInt(b), BigInt(p));
    }

    // Calculate shared secret if both private keys are available
    if (a && b) {
      // Alice calculates: s = B^a mod p
      // Bob calculates: s = A^b mod p
      // Both should get the same result
      const sharedKey = this.modExp(
        newParams.B ? BigInt(newParams.B) : BigInt(1), 
        BigInt(a), 
        BigInt(p)
      );
      newParams.sharedKey = sharedKey.toString();
    }

    return newParams;
  }

  encrypt(params, input) {
    if (!params.sharedKey) {
      toast.error("Shared key not generated yet");
      return;
    }

    try {
      const message = BigInt(input);
      const key = BigInt(params.sharedKey);
      return (message * key).toString();
    } catch (error) {
      toast.error("Encryption failed: " + error.message);
      return "Encryption error";
    }
  }

  decrypt(params, input) {
    if (!params.sharedKey) {
      toast.error("Shared key not generated yet");
      return;
    }

    try {
      const cipher = BigInt(input);
      const key = BigInt(params.sharedKey);
      return (cipher / key).toString();
    } catch (error) {
      toast.error("Decryption failed: " + error.message);
      return "Decryption error";
    }
  }

  modExp(base, exp, mod) {
    let result = BigInt(1);
    base = base % mod;
    while (exp > 0) {
      if (exp % BigInt(2) === BigInt(1)) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      exp = exp / BigInt(2);
    }
    return result;
  }

  isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  getRandomPrime() {
    let prime;
    do {
      prime = Math.floor(Math.random() * 100) + 2;
    } while (!this.isPrime(prime));
    return prime;
  }

  getRandomGenerator(p) {
    return Math.floor(Math.random() * (p - 2)) + 2;
  }

  getRandomPrivateKey(p) {
    return Math.floor(Math.random() * (p - 2)) + 2;
  }
}

export default DiffieHellmanAlgorithm;