import { memo, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';

const controlStyle = {
  background: 'transparent',
  border: 'none',
  padding: '10px',
  width: '200px',
  boxSizing: 'border-box',
};

const EncryptNode = ({ data }) => {
  const [algorithm, setAlgorithm] = useState('RSA');
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [n, setN] = useState('');
  const [e, setE] = useState('');
  const [k, setK] = useState('');
  const [d, setD] = useState('');

  useEffect(() => {
    if (p && q) {
      setN(p * q);
    }
  }, [p, q]);

  useEffect(() => {
    if (p && q && k) {
      setD(k * ((p - 1) * (q - 1) + 1));
    }
  }, [p, q, k]);

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div style={controlStyle}>
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />
      <form>
        <label>
          <select value={algorithm} onChange={handleAlgorithmChange}>
            <option value="RSA">RSA</option>
            <option value="ElGamal">ElGamal</option>
            <option value="Diffie-Hellman">Diffie-Hellman</option>
            <option value="AES">AES</option>
            <option value="DES">DES</option>
            <option value="ECB">ECB</option>
            <option value="CBC">CBC</option>
            <option value="PCBC">PCBC</option>
            <option value="CFB">CFB</option>
            <option value="Caesar">Caesar</option>
            <option value="Homophonic">Homophonic</option>
            <option value="Polyalphabetic">Polyalphabetic</option>
            <option value="Matrix Cipher">Matrix Cipher</option>
          </select>
        </label>
        <label>
          p:
          <input type="number" value={p} onChange={(e) => setP(Number(e.target.value))} />
        </label>
        <label>
          q:
          <input type="number" value={q} onChange={(e) => setQ(Number(e.target.value))} />
        </label>
        <label>
          n:
          <input type="number" value={n} readOnly />
        </label>
        <label>
          e:
          <input type="number" value={e} onChange={(e) => setE(Number(e.target.value))} />
        </label>
        <label>
          k:
          <input type="number" value={k} onChange={(e) => setK(Number(e.target.value))} />
        </label>
        <label>
          d:
          <input type="number" value={d} readOnly />
        </label>
      </form>
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(EncryptNode);