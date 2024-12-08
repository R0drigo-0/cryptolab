import OpenDesignModel from '../models/OpenDesignModel';

class OpenDesignController {
  constructor() {
    this.model = new OpenDesignModel();
  }

  addNode(labelNode) {
    const newNode = {
      id:`${this.model.getNodes().length + 1}`,
      position:{x: 100, y: 100},
      type:"CustomResizerNode",
      data:{label:labelNode}
    }
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
}

export default new OpenDesignController();