import OpenDesignController from "../controllers/OpenDesignController";

export const handleRemoveSelected = (selectedNodes, selectedEdges, setNodes, setEdges) => {
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

  selectedEdges.forEach((edge) => {
    OpenDesignController.removeEdge(edge.id);
  });

  setEdges((eds) => {
    const updatedEdges = eds.filter(
      (edge) =>
        !selectedEdges.some((selectedEdge) => selectedEdge.id === edge.id)
    );

    return updatedEdges;
  });

  // Update nodes after edges are removed
  setNodes((nds) => {
    const updatedNodes = nds.map((node) => {
      const updatedNode = { ...node };
      selectedEdges.forEach((selectedEdge) => {
        if (updatedNode.id === selectedEdge.target) {
          updatedNode.data.input = "";
        }
        if (updatedNode.id === selectedEdge.source) {
          updatedNode.data.output = "";
        }
      });
      return updatedNode;
    });

    return updatedNodes;
  });
};