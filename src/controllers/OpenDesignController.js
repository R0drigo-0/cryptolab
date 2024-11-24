import OpenDesignModel from '../models/OpenDesignModel';

class OpenDesignController {
  constructor() {
    this.model = new OpenDesignModel();
  }

  addBox(box) {
    this.model.addBox(box);
  }

  getBoxes() {
    return this.model.getBoxes();
  }

  updateBoxPosition(index, position) {
    this.model.updateBoxPosition(index, position);
  }

  updateBoxSize(index, size) {
    this.model.updateBoxSize(index, size);
  }
}

export default new OpenDesignController();