import { memo, useState, useEffect, useMemo, useRef } from 'react';
import { Handle, Position } from '@xyflow/react';
import * as Algorithms from '../algorithms';

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
  const prevParamsRef = useRef(params);

  const algorithms = useMemo(() => {
    const algos = {};
    Object.keys(Algorithms).forEach(key => {
      algos[key] = new Algorithms[key](setParams);
    });
    return algos;
  }, []);

  const algorithmsNames = Object.keys(algorithms).map(name => name.replace('Algorithm', ''));

  useEffect(() => {
    const prevParams = prevParamsRef.current;
    if (JSON.stringify(prevParams) !== JSON.stringify(params)) {
      if (algorithms[algorithm + 'Algorithm']) {
        algorithms[algorithm + 'Algorithm'].calculate(params);
      }
      prevParamsRef.current = params;
    }
  }, [algorithm, params, algorithms]);

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
        {algorithms[algorithm + 'Algorithm'] ? (
          algorithms[algorithm + 'Algorithm'].getInputs(params)
        ) : (
          <div>Error: Algorithm not found</div>
        )}
      </div>
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(EncryptNode);