import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
} from "@xyflow/react";

import {
  ConcatenateNode,
  CustomResizerNode,
  DecryptNode,
  EncryptNode,
  HashNode,
  InputNode,
  OutputNode,
  PrivateKeyNode,
  PublicKeyNode,
  ResizableNode,
  ResizableNodeSelected,
  SeedNode,
  XorNode,
} from "./components/nodes";

import { useState } from "react";

import React from "react";
import SidebarView from "./SidebarView";
import OpenDesignController from "../controllers/OpenDesignController";

import "@xyflow/react/dist/style.css";
import "../styles/OpenDesignView.css";

const OpenDesignView = () => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  console.log(nodes);
  const nodeTypes = {
    ResizableNode,
    ResizableNodeSelected,
    CustomResizerNode,
    InputNode,
    OutputNode,
    EncryptNode,
    DecryptNode,
    HashNode,
    SeedNode,
    PublicKeyNode,
    PrivateKeyNode,
    XorNode,
    ConcatenateNode,
  };

  const handleNewNode = (item) => {
    const newNode = {
      id: `${item}Node${nodes.length + 1}`,
      type: item + "Node",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: item },
    };
    OpenDesignController.addNode(newNode);
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNewEdge = (params) => {
    const newEdge = {
      id: `${edges.length + 1}`,
      source: params.source,
      target: params.target,
      animated: true,
      type: "smoothstep",
    };
    OpenDesignController.addEdge(params.source, params.target);
    setEdges((eds) => addEdge(newEdge, eds));
  };

  const handleNodesDelete = (deletedNodes) => {
    deletedNodes = deletedNodes["nodes"];
    deletedNodes.forEach((node) => {
      OpenDesignController.removeNode(node.id);
    });
    setNodes((nds) =>
      nds.filter(
        (node) =>
          !deletedNodes.some((deletedNode) => deletedNode.id === node.id)
      )
    );
  };

  const onSelectionChange = ({ nodes, edges }) => {
    setSelectedNodes(nodes);
  };

  return (
    <div>
      <SidebarView
        onNewNode={handleNewNode}
        selectedNodes={selectedNodes}
        onNodesChange={setNodes}
      />
      <div className="grid-bg">
        <ReactFlow
          fitView
          edges={edges}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onConnect={handleNewEdge}
          onDelete={handleNodesDelete}
          onSelectionChange={onSelectionChange}
        >
          <Background color="#ccc" variant={BackgroundVariant.Lines} />
          <MiniMap pannable zoomable position="bottom-right" />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === "InputNode") return "#0041d0";
              if (n.type === "OutputNode") return "#ff0072";
              if (n.type === "EncryptNode") return "#ff0072";
            }}
            nodeColor={(n) => {
              if (n.type === "selectorNode") return "#ff0072";
              return "#fff";
            }}
          />
          <Controls className="horizontal-controls" position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default OpenDesignView;
