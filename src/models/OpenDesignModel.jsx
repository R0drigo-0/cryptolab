class OpenDesignModel {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }
  
  addEdge(edge) {
    this.edges.push(edge);
  }

  getEdges() {
    return this.edges;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  getNodes() {
    return this.nodes;
  }

  removeNode(nodeId) {
    this.nodes = this.nodes.filter((node) => node.id !== nodeId);
  }

  updateNodePosition(index, position) {
    this.nodes[index].position = position;
  }

  updateNodeSize(index, size) {
    this.nodes[index].size = size;
  }

  updateNodeData(index, data) {
    this.nodes[index].data = { ...this.nodes[index].data, ...data };
  }
}

export default OpenDesignModel;