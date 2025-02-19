import React from "react";
import { toast } from "react-toastify";

class ElGamalAlgorithm {
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
          Private Key (x):
          <input
            type="number"
            value={params.x || ""}
            onChange={(e) => this.handleInputChange(e, "x", params)}
            onBlur={() => this.validateParams("x", params)}
          />
        </label>
        <label>
          Random Key (k):
          <input
            type="number"
            value={params.k || ""}
            onChange={(e) => this.handleInputChange(e, "k", params)}
            onBlur={() => this.validateParams("k", params)}
          />
        </label>
        <div>
          <label>
            Public Key (y = g^x mod p):
            <input
              type="text"
              value={params.y ? `${params.y}` : ""}
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
        if (key === "x" && newParams.p && newParams.g) {
          newParams.y = this.modExp(newParams.g, newParams.x, newParams.p);
        }
        this.setParams(newParams);
      }
    }
  }

  validateParams(key, params) {
    const { p, g, x, k } = params;

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

    if (key === "x" && x) {
      if (x <= 1 || x >= p) {
        const recommendedX = this.getRandomPrivateKey(p);
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error(`Private key must be between 1 and ${p}. For example ${recommendedX}.`);
      }
    }

    if (key === "k" && k) {
      if (k <= 1 || k >= p) {
        const recommendedK = this.getRandomPrivateKey(p);
        toast.clearWaitingQueue();
        toast.dismiss();
        toast.error(`Random key must be between 1 and ${p}. For example ${recommendedK}.`);
      }
    }
  }

  encrypt(params) {
    const { p, g, y, k, input } = params;

    if (!p || !g || !y || !k || input === undefined) {
      toast.error("All parameters must be set before encryption.");
      return;
    }

    const message = Number(input);
    const c1 = this.modExp(g, k, p);
    const c2 = (message * this.modExp(y, k, p)) % p;

    const encryptedMessage = JSON.stringify([c1, c2]);
    this.setParams({ ...params, encryptedMessage });
    return encryptedMessage;
  }

  decrypt(params) {
    const { p, x, encryptedMessage } = params;

    if (!p || !x || !encryptedMessage) {
      toast.error("All parameters must be set before decryption.");
      return;
    }

    const [c1, c2] = JSON.parse(encryptedMessage);
    const s = this.modExp(c1, x, p);
    const sInverse = this.modExp(s, p - 2, p);
    const decryptedMessage = (c2 * sInverse) % p;

    this.setParams({ ...params, decryptedMessage: decryptedMessage.toString() });
    return decryptedMessage.toString();
  }

  modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
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

export default ElGamalAlgorithm;