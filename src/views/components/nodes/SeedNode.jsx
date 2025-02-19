import { memo, useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import NodeWrapper from "./NodeWrapper";

const nodeStyle = {
  padding: "15px",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  backgroundColor: "#fff",
  textAlign: "center",
  width: "18vw",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const SeedNode = ({ data }) => {
  const [seed, setSeed] = useState("");

  const handleSeedChange = (event) => {
    setSeed(event.target.value);
    data.seed = event.target.value;
  };

  return (
    <NodeWrapper nodeType="Seed">
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Top} id="seed-input-top" />
      <Handle type="target" position={Position.Left} id="seed-input-left" />
      <Handle type="target" position={Position.Right} id="seed-input-right" />
      <Handle type="target" position={Position.Bottom} id="seed-input-bottom" />
      <div>
        <label>Seed: </label>
        <input
          type="text"
          value={seed}
          onChange={(evt) => handleSeedChange(evt)}
        />
      </div>
      <Handle type="source" position={Position.Top} id="seed-output-top" />
      <Handle type="source" position={Position.Left} id="seed-output-left" />
      <Handle
        type="source"
        position={Position.Right}
        id="seed-output-right"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="seed-output-bottom"
      />
    </div>
    </NodeWrapper>
  );
};

export default memo(SeedNode);
