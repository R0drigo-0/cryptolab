import OpenDesignModel from '../models/OpenDesignModel';

class OpenDesignController {
  constructor() {
    this.model = new OpenDesignModel();
  }

  addNode(labelNode, type = "CustomResizerNode", position = { x: 100, y: 100 }) {
    const newNode = {
      id: `${this.model.getNodes().length + 1}`,
      position,
      type,
      data: { label: labelNode }
    };
    this.model.addNode(newNode);
  }

  addEdge(source, target) {
    const newEdge = {
      id: `${this.model.getEdges().length + 1}`,
      source,
      target,
      animated: true,
      type: "smoothstep"
    };
    this.model.addEdge(newEdge);
  }

  getNodes() {
    return this.model.getNodes();
  }

  getEdges() {
    return this.model.getEdges();
  }

  updateNodePosition(index, position) {
    this.model.updateNodePosition(index, position);
  }

  updateNodeSize(index, size) {
    this.model.updateNodeSize(index, size);
  }

  updateNodeData(index, data) {
    this.model.updateNodeData(index, data);
  }
}

export default new OpenDesignController();