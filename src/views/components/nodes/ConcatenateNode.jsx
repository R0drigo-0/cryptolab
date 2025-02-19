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

const ConcatenateNode = ({ data }) => {
  console.log("Data received:", data);
  const [inputs, setInputs] = useState(["", ""]);
  const [output, setOutput] = useState("");

  // Listen for updates from parent/edges
  useEffect(() => {
    if (data.inputs) {
      setInputs(data.inputs);
    }
  }, [data.inputs]);

  // Recompute output whenever inputs change
  useEffect(() => {
    const combined = inputs.join("");
    setOutput(combined);
    data.output = combined;
  }, [inputs, data]);

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Left} id="conc-cat-1" />
      <Handle type="target" position={Position.Right} id="conc-cat-2" />

      <div style={{ marginBottom: "10px" }}>
        <strong>Concatenate Node</strong>
      </div>
      <div>
        <label>Input 1: </label>
        <input type="text" value={inputs[0]} readOnly />
      </div>
      <div>
        <label>Input 2: </label>
        <input type="text" value={inputs[1]} readOnly />
      </div>
      <div>
        <label>Output: </label>
        <input type="text" value={output} readOnly />
      </div>

      <Handle type="source" position={Position.Bottom} id="concat-out" />
    </div>
  );
};

export default memo(ConcatenateNode);