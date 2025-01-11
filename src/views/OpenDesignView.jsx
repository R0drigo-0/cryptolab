import React, { useEffect, useState } from "react";
import debounce from 'lodash.debounce';
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
import "@xyflow/react/dist/style.css";
import "../styles/OpenDesignView.css";
import SidebarView from "./SidebarView";
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
  XorNode,
} from "./components/nodes";
import {v4 as uuidv4} from 'uuid';

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
  };

  const snapGrid = [20, 20];
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const updateNodes = debounce(() => {
      nodes.forEach((node) => {
        const connectedEdges = edges.filter(
          (edge) => edge.source === node.id || edge.target === node.id
        );
        connectedEdges.forEach((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);

          if (sourceNode && targetNode) {
            if (!sourceNode.data.output) {
              console.error("Source node does not have output data");
              return;
            }
            const updatedTargetNode = {
              ...targetNode,
              data: {
                ...targetNode.data,
                input: {
                  ...targetNode.data.input,
                  ...sourceNode.data.output,
                },
              },
            };

            setNodes((nds) =>
              nds.map((n) => (n.id === targetNode.id ? updatedTargetNode : n))
            );
          }
        });
      });
    }, 100);

    updateNodes();

    return () => {
      updateNodes.cancel();
    };
  }, [nodes, edges]);

  const handleNewEdge = (params) => {
    const newEdge = {
      id: `${params.source}->${params.target}`,
      source: params.source,
      target: params.target,
      animated: true,
      type: "smoothstep",
    };
    OpenDesignController.addEdge(params.source, params.target);
    setEdges((eds) => addEdge(newEdge, eds));

    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (sourceNode && targetNode) {
      if (!sourceNode.data.output) {
        console.error("Source node does not have output data");
        return;
      }
      const updatedTargetNode = {
        ...targetNode,
        data: {
          ...targetNode.data,
          input: {
            ...targetNode.data.input,
            ...sourceNode.data.output,
          },
        },
      };

      setNodes((nds) =>
        nds.map((node) =>
          node.id === targetNode.id ? updatedTargetNode : node
        )
      );
    }
  };

  const handleNewNode = (item) => {
    const newNode = {
      id: uuidv4(), 
      type: item + "Node",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: item, input: {}, output: {} },
    };
    OpenDesignController.addNode(newNode);
    setNodes((nds) => [...nds, newNode]);
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
          snapToGrid
          nodes={nodes}
          edges={edges}
          snapGrid={snapGrid}
          nodeTypes={nodeTypes}
          onConnect={handleNewEdge}
          onDelete={handleNodesDelete}
          onNodesChange={onNodesChange}
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
