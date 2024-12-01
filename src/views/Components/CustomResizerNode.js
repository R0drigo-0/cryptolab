import { memo, useEffect, useRef } from 'react';
import { Handle, Position, NodeResizeControl } from '@xyflow/react';

const controlStyle = {
  background: 'transparent',
  border: 'none',
};

const CustomNode = ({ data }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        console.log('Resized:', entry.target);
      }
    });

    if (nodeRef.current) {
      resizeObserver.observe(nodeRef.current);
    }

    return () => {
      if (nodeRef.current) {
        resizeObserver.unobserve(nodeRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={nodeRef}>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={100} maxHeight={200} maxWidth={200}>
        <ResizeIcon />
      </NodeResizeControl>

      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: 'absolute', right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default memo(CustomNode);