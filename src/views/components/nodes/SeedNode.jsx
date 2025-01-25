import { memo, useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

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
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Top} id="encrypt-top" />
      <Handle type="target" position={Position.Left} id="encrypt-left" />
      <Handle type="target" position={Position.Right} id="encrypt-right" />
      <Handle type="target" position={Position.Bottom} id="encrypt-bottom" />
      <div>
        <label>Seed: </label>
        <input
          type="text"
          value={seed}
          onChange={(evt) => handleSeedChange(evt)}
        />
      </div>
      <Handle type="source" position={Position.Top} id="encrypt-output-top" />
      <Handle type="source" position={Position.Left} id="encrypt-output-left" />
      <Handle
        type="source"
        position={Position.Right}
        id="encrypt-output-right"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="encrypt-output-bottom"
      />
    </div>
  );
};

export default memo(SeedNode);
