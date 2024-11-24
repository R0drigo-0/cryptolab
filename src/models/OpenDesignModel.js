class OpenDesignModel {
  constructor() {
    this.boxes = []
  }

  addBox(box) {
    this.boxes.push(box);
  }

  getBoxes() {
    return this.boxes;
  }

  updateBoxPosition(index, position) {
    this.boxes[index].position = position;
  }
}

export default OpenDesignModel;