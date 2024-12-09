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

  getNodes() {
    return this.model.getNodes();
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