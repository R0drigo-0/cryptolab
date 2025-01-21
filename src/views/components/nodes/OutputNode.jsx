import { memo, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const controlStyle = {
  padding: "15px",
  border: "1px,solid #e0e0e0",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  textAlign: "center",
  width: "100%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform,0.2s, box-shadow 0.2s",
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
    navigator.clipboard.writeText(output);
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
    data.output = data.input
    setOutput(data.input);
  }, [data]);

  return (
    <div style={controlStyle}>
      <Handle type="target" position={Position.Top} id="output-top" />
      <Handle type="target" position={Position.Left} id="output-left" />
      <Handle type="target" position={Position.Right} id="output-right" />
      <Handle type="target" position={Position.Bottom} id="output-bottom" />
      <p>{output}</p>
      <FontAwesomeIcon icon={faCopy} style={iconStyle} onClick={handleCopy} />
      <Handle type="source" position={Position.Top} id="input-top" />
      <Handle type="source" position={Position.Left} id="input-left" />
      <Handle type="source" position={Position.Right} id="input-right" />
      <Handle type="source" position={Position.Bottom} id="input-bottom" />
    </div>
  );
};

export default memo(OutputNode);