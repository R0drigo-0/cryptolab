import SidebarModel from '../models/SidebarModel';

class SidebarController {
  constructor() {
    this.model = new SidebarModel();
    this.collapsed = false;
  }

  setSelectItem(item) {
    this.model.setSelectedItem(item);
  }

  getSelectedItem() {
    return this.model.getSelectedItem();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  getCollapsed() {
    return this.collapsed;
  }
}

export default new SidebarController();