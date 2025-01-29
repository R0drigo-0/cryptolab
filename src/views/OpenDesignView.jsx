import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  MarkerType,
  useViewport,
  ReactFlowProvider,
  useOnViewportChange,
  Viewport,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import styles from "../styles/OpenDesignView.module.css";
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
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleRemoveSelected } from "../utils/handleRemoveSelected";
const OpenDesignView = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [copiedNodes, setCopiedNodes] = useState([]);
  const [copiedEdges, setCopiedEdges] = useState([]);
  const [snapGrid, setSnapGrid] = useState([1, 1]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [nodeKeys, setNodeKeys] = useState({});

  // Mantain sync between model and view
  useEffect(() => {
    setNodes(OpenDesignController.getNodes());
    setEdges(OpenDesignController.getEdges());
  }, []);

  let { viewport } = useViewport({
    x: 0,
    y: 0,
    zoom: 1,
  });

  const setViewport = (v) => {
    setSnapGrid([Math.max(1, 32 / v.zoom), Math.max(1, 32 / v.zoom)]);
    viewport = v;
  };

  const nodeTypes = {
    ResizableNode,
    ResizableNodeSelected,
    CustomResizerNode,
    InputNode,
    ConcatenateNode,
    DecryptNode,
    EncryptNode,
    HashNode,
    OutputNode,
    PrivateKeyNode,
    PublicKeyNode,
    SeedNode,
    XorNode,
  };

  const updateViewportConst = ({ x, y, zoom }) => {
    setViewport({ x, y, zoom });
  };

  const handleSelectCopy = () => {
    const nodeIdMap = new Map();
    const newCopiedNodes = selectedNodes.map((node) => {
      const newId = uuidv4();
      nodeIdMap.set(node.id, newId);
      return {
        ...node,
        id: newId,
        position: { x: node.position.x + 50, y: node.position.y + 50 },
      };
    });

    setCopiedNodes(newCopiedNodes);

    const newCopiedEdges = selectedEdges.map((edge) => ({
      ...edge,
      id: uuidv4(),
      source: nodeIdMap.get(edge.source),
      target: nodeIdMap.get(edge.target),
    }));
    setCopiedEdges(newCopiedEdges);
  };

  const handlePaste = () => {
    const nodeIdMap = new Map();
    const newPastedNodes = copiedNodes.map((node) => {
      const newId = uuidv4();
      nodeIdMap.set(node.id, newId);
      return {
        ...node,
        id: newId,
        position: { x: node.position.x + 50, y: node.position.y + 50 },
      };
    });

    const newPastedEdges = copiedEdges.map((edge) => ({
      ...edge,
      id: uuidv4(),
      source: nodeIdMap.get(edge.source),
      target: nodeIdMap.get(edge.target),
    }));
    setNodes((nds) => [...nds, ...newPastedNodes]);
    setEdges((eds) => [...eds, ...newPastedEdges]);
  };

  const handleNewEdge = (params) => {
    const edgeExists = edges.some(
      (edge) => edge.source === params.source && edge.target === params.target
    );

    if (edgeExists) {
      toast.error("An edge already exists between these nodes.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (params.source === params.target) {
      toast.error("Cannot connect a node to itself.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const newEdge = {
      id: `${params.source}-${params.sourceHandle}->${params.target}-${params.targetHandle}`,
      source: params.source,
      target: params.target,
      sourceHandle: params.sourceHandle,
      targetHandle: params.targetHandle,
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 22,
        height: 22,
        color: "#FF0072",
      },
      style: {
        strokeWidth: 2,
        stroke: "#FF0072",
      },
      selectable: true,
    };
    OpenDesignController.addEdge(params.source, params.target);
    setEdges((eds) => addEdge(newEdge, eds));

    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (sourceNode && targetNode) {
      console.log("Source Node", sourceNode.data.privKey);
      const updatedTargetNode = {
        ...targetNode,
        data: {
          ...targetNode.data,
          input: sourceNode.data.output,
          ...(sourceNode.data.seed && { seed: sourceNode.data.seed }),
          ...(sourceNode.data.pubKey && { pubKey: sourceNode.data.pubKey }),
          ...(sourceNode.data.privKey && { privKey: sourceNode.data.privKey }),
        },
      };

      setNodes((nds) =>
        nds.map((n) => (n.id === targetNode.id ? updatedTargetNode : n))
      );
    }
  };

  const handleNewNode = (item) => {
    const newNode = {
      id: uuidv4(),
      type: item.replace(/\s+/g, "") + "Node",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: item },
    };
    OpenDesignController.addNode(newNode);
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodesChange = (item) => {
    onNodesChange(item);
  };

  const cleanupNodeData = useCallback((nodeId) => {
    setNodes((nds) => 
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              input: "",
              output: "",
              pubKey: undefined,
              privKey: undefined,
              seed: undefined
            }
          };
        }
        return node;
      })
    );
  }, []);

  const handleDelete = useCallback(() => {
    const deletedNodes = [...selectedNodes];
    const deletedEdges = [...selectedEdges];

    deletedEdges.forEach((edge) => {
      cleanupNodeData(edge.target);
      setNodeKeys((prev) => ({
        ...prev,
        [edge.target]: (prev[edge.target] || 0) + 1 
      }));
    });

    handleRemoveSelected(
      selectedNodes,
      selectedEdges,
      setNodes,
      setEdges
    );

    setUndoStack((prevUndoStack) => [
      ...prevUndoStack,
      { nodes: deletedNodes, edges: deletedEdges }
    ]);
    setRedoStack([]);
  }, [selectedNodes, selectedEdges, cleanupNodeData]);

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const lastDeleted = undoStack[undoStack.length - 1];
    setUndoStack((prevUndoStack) => prevUndoStack.slice(0, -1));
    setRedoStack((prevRedoStack) => [
      ...prevRedoStack,
      { nodes: lastDeleted.nodes, edges: lastDeleted.edges },
    ]);

    setNodes((nds) => [...nds, ...lastDeleted.nodes]);
    setEdges((eds) => [...eds, ...lastDeleted.edges]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const lastUndone = redoStack[redoStack.length - 1];
    setRedoStack((prevRedoStack) => prevRedoStack.slice(0, -1));
    setUndoStack((prevUndoStack) => [
      ...prevUndoStack,
      { nodes: lastUndone.nodes, edges: lastUndone.edges },
    ]);

    handleRemoveSelected(
      lastUndone.nodes,
      lastUndone.edges,
      setNodes,
      setEdges
    );
  };

  const onSelectionChange = ({ nodes, edges }) => {
    setSelectedNodes(nodes || []);
    setSelectedEdges(edges || []);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const code = event.which || event.keyCode;
      let charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === "c") {
        event.preventDefault();
        handleSelectCopy();
      } else if ((event.ctrlKey || event.metaKey) && charCode === "v") {
        handlePaste();
        event.preventDefault();
      } else if ((event.ctrlKey || event.metaKey) && charCode === "z") {
        event.preventDefault();
        handleUndo();
      } else if ((event.ctrlKey || event.metaKey) && charCode === "y") {
        event.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedNodes,
    selectedNodes,
    copiedNodes,
    copiedEdges,
    undoStack,
    redoStack,
  ]);

  useEffect(() => {
    const updateNodes = debounce(() => {
      nodes.forEach((node) => {
        edges.forEach((edge) => {
          if (edge.source === node.id) {
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (targetNode) {
              setNodes((nds) =>
                nds.map((n) => {
                  if (n.id === edge.target) {
                    return {
                      ...n,
                      data: {
                        ...n.data,
                        input: node.data.output,
                        seed: node.data.seed,
                        pubKey: node.data.pubKey,
                        privKey: node.data.privKey,
                      },
                      key: nodeKeys[n.id] || 0
                    };
                  }
                  return n;
                })
              );
            }
          }
        });
      });
    }, 100);

    updateNodes();
    return () => updateNodes.cancel();
  }, [nodes, edges, nodeKeys]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          boxShadow: "none",
          borderRadius: "5px",
          transition: "box-shadow 0.125s ease, border-radius 0.125s ease",
        },
      }))
    );

    setNodes((nds) =>
      nds.map((node) =>
        selectedNodes.some((selectedNode) => selectedNode.id === node.id)
          ? {
              ...node,
              style: {
                ...node.style,
                boxShadow: "0 0 0 2px rgba(255, 0, 115, 0.5)",
                borderRadius: "9px",
                transition: "box-shadow 0.125s ease, border-radius 0.125s ease",
              },
            }
          : node
      )
    );
  }, [selectedNodes]);

  useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) =>
        selectedEdges.some((selectedEdge) => selectedEdge.id === edge.id)
          ? {
              ...edge,
              style: {
                ...edge.style,
                stroke: "#8400ff",
                transition: "stroke 0.125s ease",
              },
              markerEnd: {
                type: MarkerType.Arrow,
                width: 22,
                height: 22,
                color: "#8400ff",
              },
            }
          : {
              ...edge,
              style: {
                ...edge.style,
                stroke: "#FF0072",
                transition: "stroke 0.125s ease",
              },
              markerEnd: {
                type: MarkerType.Arrow,
                width: 22,
                height: 22,
                color: "#FF0072",
              },
            }
      )
    );
  }, [selectedEdges]);

  return (
    <div className={styles.openDesignView}>
      <ReactFlowProvider>
        <SidebarView onNewNode={handleNewNode} handleDelete={handleDelete} />
        <div className={styles.gridBg}>
          <ReactFlow
            fitView
            snapToGrid
            nodes={nodes}
            edges={edges}
            snapGrid={snapGrid}
            nodeTypes={nodeTypes}
            onConnect={handleNewEdge}
            onDelete={handleDelete}
            onNodesChange={handleNodesChange}
            onEdgesChange={onEdgesChange}
            onSelectionChange={onSelectionChange}
            selectNodesOnDrag
            multiSelectionKeyCode={16}
            onViewportChange={(viewport) => setViewport(viewport)}
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
            <Controls
              className={styles.horizontalControls}
              position="bottom-right"
            />
          </ReactFlow>
          {selectedNodes.length == -1 && (
            <div
              style={{
                position: "absolute",
                top: selectedNodes[0].position.y + 90,
                left: selectedNodes[0].position.x + 318,
                backgroundColor: "white",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 10,
              }}
            >
              <button onClick={handleDelete}>Delete Node</button>
            </div>
          )}
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default OpenDesignView;
