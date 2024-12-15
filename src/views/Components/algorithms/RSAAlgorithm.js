import React from "react";
import { toast } from "react-toastify";

class RSAAlgorithm {
  constructor(setParams) {
    this.setParams = setParams;
  }

  getInputs(params) {
    return (
      <div>
        <label>
          p:
          <input
            type="number"
            value={params.p || ""}
            onChange={(e) => this.handleInputChange(e, 'p', params)}
          />
        </label>
        <label>
          q:
          <input
            type="number"
            value={params.q || ""}
            onChange={(e) => this.handleInputChange(e, 'q', params)}
          />
        </label>
        <label>
          e:
          <input
            type="number"
            value={params.e || ""}
            onChange={(e) => this.handleInputChange(e, 'e', params)}
          />
        </label>
        <label>
          n:
          <input type="number" value={params.n || ""} readOnly />
        </label>
        <label>
          d:
          <input type="number" value={params.d || ""} readOnly />
        </label>
        {params.e && params.n && (
          <div>
            <label>
              kpub:
              <input
                type="text"
                value={`(${params.e}, ${params.n})`}
                readOnly
              />
            </label>
          </div>
        )}
        {params.d && params.n && (
          <div>
            <label>
              kpriv:
              <input
                type="text"
                value={`(${params.d}, ${params.n})`}
                readOnly
              />
            </label>
          </div>
        )}
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
        this.setParams({ ...params, [key]: numValue });
      }
    }
  }

  calculate(params) {
    const { p, q, e } = params;
    let newParams = { ...params };

    if (!p) {
      return;
    }

    if (!this.isPrime(p)) {
      const recommendedP = this.getRandomPrime();
      toast.clearWaitingQueue();
      toast.dismiss();
      toast.error(`p must be a prime number. For example ${recommendedP}.`);
      return;
    }

    if (!q) {
      return;
    }

    if (!this.isPrime(q)) {
      const recommendedQ = this.getRandomPrime();
      toast.clearWaitingQueue();
      toast.dismiss();
      toast.error(`q must be a prime number. For example ${recommendedQ}.`);
      return;
    }

    newParams.n = p * q;
    const phi = (p - 1) * (q - 1);
    newParams.phi = phi;

    if (!e) {
      return;
    }

    if (e <= 1 || e >= phi || this.gcd(e, phi) !== 1) {
      const recommendedE = this.getRandomCoprime(phi);
      toast.clearWaitingQueue();
      toast.dismiss();
      toast.error(`e must be greater than 1, less than ${phi}, and coprime with ${phi}. For example ${recommendedE}.`);
      return;
    }

    newParams.d = this.modInverse(e, phi);

    if (newParams.d === null || newParams.d === undefined) {
      toast.clearWaitingQueue();
      toast.dismiss();
      toast.error("Failed to calculate the modular inverse. Please check the values of p, q, and e.");
      return;
    }

    newParams.kpub = `(${e}, ${newParams.n})`;
    newParams.kpriv = `(${newParams.d}, ${newParams.n})`;

    this.setParams(newParams);
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
      prime = Math.floor(Math.random() * 100) + 2; // Generate a random number between 2 and 101
    } while (!this.isPrime(prime));
    return prime;
  }

  getRandomCoprime(phi) {
    let coprime;
    do {
      coprime = Math.floor(Math.random() * (phi - 2)) + 2; // Generate a random number between 2 and phi-1
    } while (this.gcd(coprime, phi) !== 1);
    return coprime;
  }

  gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;

    if (phi === 1) return 0;

    while (e > 1) {
      // q is quotient
      q = Math.floor(e / phi);
      t = phi;

      // phi is remainder now, process same as Euclid's algo
      phi = e % phi;
      e = t;
      t = x0;

      x0 = x1 - q * x0;
      x1 = t;
    }

    // Make x1 positive
    if (x1 < 0) x1 += m0;

    return x1;
  }

  encrypt(message, e, n) {
    return Math.pow(message, e) % n;
  }

  decrypt(ciphertext, d, n) {
    return Math.pow(ciphertext, d) % n;
  }
}

export default RSAAlgorithm;