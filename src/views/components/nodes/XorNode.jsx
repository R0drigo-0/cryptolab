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
    console.log("Data received:", data);
    const inputValue = data.input || "";

    if (data.sourceId) {
      console.log("Source ID:", data.sourceId);

      // Check if the sourceId matches input1
      if (sourceIDinput1 && data.sourceId === sourceIDinput1) {
        console.log("Updating input1 with:", inputValue);
        setInput1(inputValue);
      }
      // Check if the sourceId matches input2
      else if (sourceIDinput2 && data.sourceId === sourceIDinput2) {
        console.log("Updating input2 with:", inputValue);
        setInput2(inputValue);
      }
      // If neither input is assigned, assign to input1 if it's empty
      else if (!sourceIDinput1) {
        console.log(
          "Assigning input1 with:",
          inputValue,
          "Source ID:",
          data.sourceId
        );
        setSourceIDinput1(data.sourceId);
        setInput1(inputValue);
      }
      // If input1 is assigned and input2 is not, assign to input2
      else if (!sourceIDinput2) {
        console.log(
          "Assigning input2 with:",
          inputValue,
          "Source ID:",
          data.sourceId
        );
        setSourceIDinput2(data.sourceId);
        setInput2(inputValue);
      }
      // If both are assigned, ignore the new input
      else {
        console.log(
          "Both inputs are assigned, ignoring:",
          inputValue,
          "Source ID:",
          data.sourceId
        );
      }
    }
  }, [data, sourceIDinput1, sourceIDinput2]);

  useEffect(() => {
    if (input1 && input2) {
      const xorResult = input1
        .split("")
        .map((char, index) => {
          const xorValue =
            char.charCodeAt(0) ^ input2.charCodeAt(index % input2.length);
          // Convert the XOR result to a hexadecimal string
          const hexString = xorValue.toString(16).padStart(2, "0");
          return hexString;
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
