import React from 'react';

class RSAAlgorithm {
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
          k:
          <input type="number" value={params.k || ''} onChange={(e) => this.setParams({ ...params, k: Number(e.target.value) })} />
        </label>
        <label>
          n:
          <input type="number" value={params.n || ''} readOnly />
        </label>
        <label>
          d:
          <input type="number" value={params.d || ''} readOnly />
        </label>
      </div>
    );
  }

  calculate(params) {
    const { p, q, k } = params;
    let newParams = { ...params };
    if (p && q) {
      newParams.n = p * q;
    }
    if (p && q && k) {
      newParams.d = k * ((p - 1) * (q - 1) + 1);
    }
    this.setParams(newParams);
  }
}

export default RSAAlgorithm;