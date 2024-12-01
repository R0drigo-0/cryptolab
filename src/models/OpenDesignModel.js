class OpenDesignModel {
  constructor() {
    this.nodes = []
  }

  addNode(node) {
    this.nodes.push(node);
  }

  getNodes() {
    return this.nodes;
  }

  updateNodePosition(index, position) {
    this.boxes[index].position = position;
  }

  updateNodeSize(index, size) {
    this.boxes[index].size = size;
  }
}

export default OpenDesignModel;