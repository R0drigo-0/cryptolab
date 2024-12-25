import "../styles/OpenDesignView.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  NodeResizer,
  Handle,
  Position
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import SidebarView from "./SidebarView";
import SidebarController from "../controllers/SidebarController";
import OpenDesignController from "../controllers/OpenDesignController";
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
  XorNode
} from "./components/nodes";

const OpenDesignView = () => {
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
  }
  
  const snapGrid = [20,20];
  const defaultViewport = {x:0, y:0, zoom:1.5};

  const initialNodes = [];
  
  const initialEdges = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNewEdge = (params) => {
    const newEdge = {
      id: `${edges.length + 1}`,
      source: params.source,
      target: params.target,
      animated: true,
      type: "smoothstep"
    };
    OpenDesignController.addEdge(params.source, params.target);
    setEdges((eds) => addEdge(newEdge, eds));
    console.log(OpenDesignController.getEdges());
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
    console.log(OpenDesignController.getNodes());
  };

  const handleNodesDelete = (deletedNodes) => {
    deletedNodes.forEach(node => {
      OpenDesignController.removeNode(node.id);
    });
    setNodes((nds) => nds.filter(node => !deletedNodes.some(deletedNode => deletedNode.id === node.id)));
  };

  return (
    <div>
      <SidebarView onNewNode={handleNewNode}/>
      <div className="grid-bg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleNewEdge}
          onNodesDelete={handleNodesDelete}
          fitView
          nodeTypes={nodeTypes}
          snapToGrid
          snapGrid={snapGrid}
          attributionPosition="bottom-left"
        >
          <Background color="#ccc" variant={BackgroundVariant.Lines} />
            <MiniMap  pannable zoomable position="bottom-right" />
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.type === 'InputNode') return '#0041d0';
                if (n.type === 'OutputNode') return  '#ff0072';
                if (n.type === 'EncryptNode') return '#ff0072';
              }}
              nodeColor={(n) => {
                if (n.type === 'selectorNode') return '#ff0072';
                return '#fff';
              }}
            />
            <Controls className="horizontal-controls" position="bottom-right" />
        </ReactFlow>
      </div>
    </div>
  );
};

export default OpenDesignView;