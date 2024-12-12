import { memo, useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import RSAAlgorithm from './algorithms/RSAAlgorithm';
import ElGamalAlgorithm from './algorithms/ElGamalAlgorithm';
import DiffieHellmanAlgorithm from './algorithms/DiffieHellmanAlgorithm';
import AESAlgorithm from './algorithms/AESAlgorithm';
import DESAlgorithm from './algorithms/DESAlgorithm';
import ECBAlgorithm from './algorithms/ECBAlgorithm';
import CBCAlgorithm from './algorithms/CBCAlgorithm';
import PCBCAlgorithm from './algorithms/PCBCAlgorithm';
import CFBAlgorithm from './algorithms/CFBAlgorithm';
import CaesarAlgorithm from './algorithms/CaesarAlgorithm';
import HomophonicAlgorithm from './algorithms/HomophonicAlgorithm';
import PolyalphabeticAlgorithm from './algorithms/PolyalphabeticAlgorithm';
import MatrixCipherAlgorithm from './algorithms/MatrixCipherAlgorithm';


const controlStyle = {
  background: 'transparent',
  border: 'none',
  padding: '10px',
  width: '200px',
  boxSizing: 'border-box',
};

const EncryptNode = ({ data }) => {
  const [algorithm, setAlgorithm] = useState('RSA');
  const [params, setParams] = useState({});

  const algorithms = {
    RSA: new RSAAlgorithm(setParams),
    ElGamal: new ElGamalAlgorithm(setParams),
    //DiffieHellman: new DiffieHellmanAlgorithm(setParams),
    //AES: new AESAlgorithm(setParams),
    //DES: new DESAlgorithm(setParams),
    //ECB: new ECBAlgorithm(setParams),
    //CBC: new CBCAlgorithm(setParams),
    //PCBC: new PCBCAlgorithm(setParams),
    //CFB: new CFBAlgorithm(setParams),
    //Caesar: new CaesarAlgorithm(setParams),
    //Homophonic: new HomophonicAlgorithm(setParams),
    //Polyalphabetic: new PolyalphabeticAlgorithm(setParams),
    //MatrixCipher: new MatrixCipherAlgorithm(setParams),
  }

  const algorithmsNames = Object.keys(algorithms);

  useEffect(() => {
    algorithms[algorithm].calculate(params);
  }, [params, algorithm]);


  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div style={controlStyle}>
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />
      <div>
        <label>
          <select value={algorithm} onChange={handleAlgorithmChange}>
            {algorithmsNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        {algorithms[algorithm].getInputs(params)}
      </div>
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(EncryptNode);