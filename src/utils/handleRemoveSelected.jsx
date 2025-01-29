import OpenDesignController from "../controllers/OpenDesignController";

export const handleRemoveSelected = (selectedNodes, selectedEdges, setNodes, setEdges) => {
  setNodes((nds) => {
    const updatedNodes = nds.map((node) => {
      const updatedNode = { ...node };
      selectedEdges.forEach((selectedEdge) => {
        if (updatedNode.id === selectedEdge.target) {
          // Clear the data related to the edge
          updatedNode.data = {
            ...updatedNode.data,
            input: updatedNode.data.input === selectedEdge.source ? "" : updatedNode.data.input,
            output: updatedNode.data.output === selectedEdge.source ? "" : updatedNode.data.output,
          };
        }
      });
      return updatedNode;
    });
    return updatedNodes;
  });

  // Remove selected nodes
  selectedNodes.forEach((node) => {
    OpenDesignController.removeNode(node.id);
  });

  setNodes((nds) => {
    const updatedNodes = nds.map((node) => {
      const updatedNode = { ...node };
      selectedNodes.forEach((selectedNode) => {
        if (updatedNode.data.input === selectedNode.id) {
          updatedNode.data.input = "";
        }
        if (updatedNode.data.output === selectedNode.id) {
          updatedNode.data.output = "";
        }
      });
      return updatedNode;
    });

    return updatedNodes.filter(
      (node) =>
        !selectedNodes.some((selectedNode) => selectedNode.id === node.id)
    );
  });

  setEdges((eds) => {
    const updatedEdges = eds.filter(
      (edge) =>
        !selectedEdges.some((selectedEdge) => selectedEdge.id === edge.id)
    );

    return updatedEdges;
  });

  // Call setTrigger to force re-render
};