import React from 'react';

class ElGamalAlgorithm {
  constructor(setParams) {
    this.setParams = setParams;
  }

  getInputs(params) {
    return (
      <div>
        <label>
          p:
          <input type="number" value={params.p || ''} onChange={(e) => this.setParams({ ...params, p: Number(e.target.value) })} />
        </label>
        <label>
          q:
          <input type="number" value={params.q || ''} onChange={(e) => this.setParams({ ...params, q: Number(e.target.value) })} />
        </label>
        <label>
          β:
          <input type="number" value={params.beta || ''} onChange={(e) => this.setParams({ ...params, beta: Number(e.target.value) })} />
        </label>
        <label>
          d:
          <input type="number" value={params.d || ''} onChange={(e) => this.setParams({ ...params, d: Number(e.target.value) })} />
        </label>
        <label>
          h:
          <input type="number" value={params.h || ''} onChange={(e) => this.setParams({ ...params, h: Number(e.target.value) })} />
        </label>
        <label>
          α:
          <input type="number" value={params.alpha || ''} readOnly />
        </label>
        <label>
          Kpriv:
          <input type="number" value={params.kpriv || ''} readOnly />
        </label>
        <label>
          Kpub:
          <input type="number" value={params.kpub || ''} readOnly />
        </label>
        <label>
          c1:
          <input type="number" value={params.c1 || ''} readOnly />
        </label>
        <label>
          c2:
          <input type="number" value={params.c2 || ''} readOnly />
        </label>
        <label>
          c:
          <input type="number" value={params.c || ''} readOnly />
        </label>
      </div>
    );
  }

  generatePublicKey(params) {
    const { p, q, alpha, d } = params;
    let newParams = { ...params };
    if (p && q && alpha && d) {
      newParams.beta = Math.pow(alpha, d) % p;
      newParams.kpub = [p, alpha, newParams.beta];
    }
    this.setParams(newParams);
  }

  generatePrivateKey(params) {
    const { d } = params;
    let newParams = { ...params };
    if (d) {
      newParams.kpriv = [d];
    }
    this.setParams(newParams);
  }

  calculate(params) {
    const { p, q } = params;
    let newParams = { ...params };
    if (q && p) {
      newParams.alpha = Math.pow(q, -1) % p;
    }
    this.setParams(newParams);
  }

  encrypt(params, msg) {
    const { p, alpha, beta, h } = params;
    let newParams = { ...params };
    if (p && alpha && beta && h) {
      newParams.c1 = Math.pow(alpha, h) % p;
      newParams.c2 = (msg * Math.pow(beta, h)) % p;
      newParams.c = [newParams.c1, newParams.c2];
    }
    this.setParams(newParams);
  }

  decrypt(params, c) {
    const { p, d } = params;
    const [c1, c2] = c;
    let newParams = { ...params };
    if (p && d && c1 && c2) {
      const c1Inverse = Math.pow(c1, p - 1 - d) % p;
      newParams.m = (c2 * c1Inverse) % p;
    }
    this.setParams(newParams);
  }
}

export default ElGamalAlgorithm;