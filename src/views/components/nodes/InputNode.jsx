import { Handle, Position } from '@xyflow/react';
import { memo, useState, useEffect } from 'react';

const controlStyle = {
  background: 'transparent',
  border: 'none',
  resize: 'none',
  overflow: 'hidden',
  width: '100%',
  boxSizing: 'border-box',
}

const InputNode = ({ data }) => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
    data["output"]["inputText"] = event.target.value;
    console.log(data["output"]["inputText"]);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  }

  useEffect(() => {
    data["output"]["inputText"] = text;
  }, [text]);

  return (
    <div style={controlStyle}>
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
      <Handle type="target" position={Position.Bottom} />
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter text here"
        style={{ ...controlStyle, height: 'auto' }}
        rows={1}
      />
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default memo(InputNode);