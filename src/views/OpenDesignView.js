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
import SidebarView from "./Components/SidebarView";
import SidebarController from "../controllers/SidebarController";
import OpenDesignController from "../controllers/OpenDesignController";
import ResizableNode from "./Components/ResizableNode";
import ResizableNodeSelected from "./Components/ResizableNodeSelected";
import CustomResizerNode from "./Components/CustomResizerNode";
import InputNode from "./Components/InputNode";
import OutputNode from "./Components/OutputNode";
import EncryptNode from "./Components/EncryptNode";
import DecryptNode from "./Components/DecryptNode";
import HashNode from "./Components/HashNode";
import SeedNode from "./Components/SeedNode";
import PublicKeyNode from "./Components/PublicKeyNode";
import PrivateKeyNode from "./Components/PrivateKeyNode";
import XorNode from "./Components/XorNode";
import ConcatenateNode from "./Components/ConcatenateNode";

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

  const initialNodes = [
    { id: "1", type:"InputNode", position: { x: 0, y: 0 }, data: { label: "1",  } },
    { id: "2", type:"CustomResizerNode", position: { x: 100, y: 0 }, data: { label: "2" } },
  ];
  
  const initialEdges = [];

  const [selectedItem, setSelectItem] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, type: "smoothstep"}, eds),
      ),
    [],
  );

  const handleNewNode = (item) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "CustomResizerNode",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: item },
    };
    OpenDesignController.addNode(newNode);
    setNodes((nds) => [...nds, newNode]);
    console.log(OpenDesignController.getNodes());
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
          onConnect={onConnect}
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
                if (n.type === 'ResizableNode') return '#0041d0';
                if (n.type === 'ResizableNodeSelected') return  '#ff0072';
                if (n.type === 'CustomResizerNode') return '#ff0072';
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
