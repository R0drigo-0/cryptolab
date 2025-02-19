import { Handle, Position } from '@xyflow/react';
import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NodeContainer = styled.div`
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  text-align: center;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledInput = styled.textarea`
  width: 100%;
  height: auto;
  background-color: transparent;
  border: none;
  resize: none;
  overflow: hidden;
  outline: none;
  font-size: 14px;
  color: #333;
  padding: 5px;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 3px;
  right: 3px;
  cursor: pointer;
  color: #ff0071;
`;

const InputNode = ({ data }) => {
  const [text, setText] = useState('');
  
  const handleChange = (event) => {
    const input = event.target.value;
    setText(input);
    let output = '';
  
    if (input === '') {
      output = '';
    } else if (/^[01]+$/.test(input)) {
      output = input[0] === '0' ? parseInt(input, 2).toString() : input;
    } else if (/^\d+$/.test(input)) {
      output = input;
    } else if (/[a-zA-Z]/.test(input)) {
      output = Array.from(input)
        .map(char => char.charCodeAt(0))
        .join('');
    } else {
      output = input;
    }
    
    data.output = output;
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
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

  return (
    <NodeContainer>
      <Handle type="target" position={Position.Top} id="input-top" />
      <Handle type="target" position={Position.Left} id="input-left" />
      <Handle type="target" position={Position.Right} id="input-right" />
      <Handle type="target" position={Position.Bottom} id="input-bottom" />
      <StyledInput
        value={text}
        onChange={handleChange}
        placeholder="Enter text here"
        rows={1}
      />
      <IconContainer onClick={handleCopy}>
        <FontAwesomeIcon icon={faCopy} />
      </IconContainer>
      <Handle type="source" position={Position.Top} id="output-top" />
      <Handle type="source" position={Position.Left} id="output-left" />
      <Handle type="source" position={Position.Right} id="output-right" />
      <Handle type="source" position={Position.Bottom} id="output-bottom" />
    </NodeContainer>
  )
}

export default memo(InputNode);