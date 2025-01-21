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

  removeEdge(edgeId) {
    this.edges = this.edges.filter((edge) => edge.id !== edgeId);
  }

      
  updateNodePosition(id, position){
    const index = this.nodes.findIndex(node => node.id === id);
    console.log("index", index);
    console.log("position", position);
    if (index === -1) {
      this.nodes[index].position = position;
    }
  }

  updateNodeSize(index, size) {
    this.nodes[index].size = size;
  }

  updateNodeData(index, data) {
    this.nodes[index].data = { ...this.nodes[index].data, ...data };
  }
}

export default OpenDesignModel;