import { memo, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const controlStyle = {
  background: 'transparent',
  border: 'none',
  overflow: 'hidden',
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px',
};

const iconStyle = {
  position: 'absolute',
  bottom: '3px',
  right: '3px',
  cursor: 'pointer',
  color: '#ff0071'
};

const OutputNode = ({ data }) => {
  const [output, setOutput] = useState('');
  const handleCopy = () => {
    navigator.clipboard.writeText(data.label);
    toast.success('Text copied to clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    setOutput(data.input.inputText);
  }, [data]);

  return (
    <div style={controlStyle}>
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />
      <p>{output}</p>
      <FontAwesomeIcon icon={faCopy} style={iconStyle} onClick={handleCopy} />
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(OutputNode);