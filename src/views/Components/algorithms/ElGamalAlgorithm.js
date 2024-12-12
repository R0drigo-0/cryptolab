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
          <input type="number" value={params.c2 || ''} readOnly />
        </label>
      </div>
    );
  }

  encrypt(params){

  }
  
  decrypt(params){

  }

  generatePublicKey(params)
  {
    const {p, q, alpha, d} = params
    var newParams = {...params}
    if(p && q && alpha && d) {
      
      newParams.kpub = []
    }
    this.setParams(newParams)
  }

  generatePrivateKey(params)
  {
    const {p, q, alpha, d} = params
    var newParams = {...params}
    if(d) {
      newParams.kpriv = [d]
    }
    this.setParams(newParams);
  }

  calculate(params) {
    const { p, q, k } = params;
    let newParams = { ...params };
    if (q && p){
      newParams.alpha = (1/q) % p
    }

    this.setParams(newParams);
  }
}

export default ElGamalAlgorithm;