import { memo, useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { toast, ToastContainer } from "react-toastify";

const nodeStyle = {
  padding: "15px",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  backgroundColor: "#fff",
  textAlign: "center",
  width: "18vw",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const XorNode = ({ data }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [sourceIDinput1, setSourceIDinput1] = useState("");
  const [sourceIDinput2, setSourceIDinput2] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    console.log(data);
    const inputValue = data.input || "";
  
    // If sourceId is already assigned to input1, update input1
    if (data.sourceId === sourceIDinput1) {
      setInput1(inputValue);
    } 
    // Else if sourceId is already assigned to input2, update input2
    else if (data.sourceId === sourceIDinput2) {
      setInput2(inputValue);
    } 
    // If input1 is not set, assign data to input1
    else if (!sourceIDinput1) {
      setSourceIDinput1(data.sourceId);
      setInput1(inputValue);
    } 
    // Else if input2 is not set and sourceId is new, assign data to input2
    else if (!sourceIDinput2 && data.sourceId !== sourceIDinput1) {
      setSourceIDinput2(data.sourceId);
      setInput2(inputValue);
    }
  }, [data, sourceIDinput1, sourceIDinput2]);

  useEffect(() => {
    if (input1 && input2) {
      const xorResult = input1
        .split("")
        .map((char, index) => {
          const xorChar = char.charCodeAt(0) ^ input2.charCodeAt(index % input2.length);
          return String.fromCharCode(xorChar);
        })
        .join("");
      setOutput(xorResult);
      data.output = xorResult;
    }
  }, [input1, input2, data]);

  const swapInputs = () => {
    // Swap input values
    const tempInput = input1;
    setInput1(input2);
    setInput2(tempInput);

    // Also swap the corresponding source IDs
    const tempSourceID = sourceIDinput1;
    setSourceIDinput1(sourceIDinput2);
    setSourceIDinput2(tempSourceID);

    // Show a toast informing the user
  };

  return (
    <div style={nodeStyle}>
      <Handle type="target" position={Position.Top} id="xor-in-t" />
      <Handle type="target" position={Position.Left} id="xor-in-l" />
      <Handle type="target" position={Position.Right} id="xor-in-r" />
      <Handle type="target" position={Position.Bottom} id="xor-in-b" />

      <div>
        <label>Input 1:</label>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div>
        <label>Input 2:</label>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div>
        {/* Swap icon button */}
        <button
          onClick={swapInputs}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            margin: "10px 0",
          }}
          title="Swap Inputs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16 18l4-4-4-4v3H4v2h12zM8 6l-4 4 4 4V11h12V9H8z" />
          </svg>
        </button>
      </div>
      <div>
        <label>Output:</label>
        <input type="text" value={output} readOnly />
      </div>

      <Handle type="source" position={Position.Top} id="xor-out-t" />
      <Handle type="source" position={Position.Left} id="xor-out-l" />
      <Handle type="source" position={Position.Right} id="xor-out-r" />
      <Handle type="source" position={Position.Bottom} id="xor-out-b" />

      {/* Toast Container */}
    </div>
  );
};

export default memo(XorNode);