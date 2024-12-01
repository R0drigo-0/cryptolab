import OpenDesignModel from '../models/OpenDesignModel';

class OpenDesignController {
  constructor() {
    this.model = new OpenDesignModel();
  }

  addNode(node) {
    this.model.addBox(node);
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