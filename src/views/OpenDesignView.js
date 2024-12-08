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

const OpenDesignView = () => {
  const nodeTypes = {
    ResizableNode,
    ResizableNodeSelected,
    CustomResizerNode,  
  }
  
  const snapGrid = [20, 20];
  const defaultViewport = {x:0, y:0, zoom:1.5};

  const initialNodes = [
    { id: "1", type:"CustomResizerNode", position: { x: 200, y: 200 }, data: { label: "1" } },
    { id: "2", type:"CustomResizerNode", position: { x: 300, y: 175 }, data: { label: "2" } },
  ];
  
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  const [selectedItem, setSelectItem] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true }, eds),
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
                console.log(n);
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
