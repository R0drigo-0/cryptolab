import SidebarModel from '../models/SidebarModel';

class SidebarController {
  constructor() {
    this.model = new SidebarModel();
    this.collapsed = true;
  }

  setSelectItem(item) {
    this.model.setSelectedItem(item);
  }

  getSelectedItem() {
    return this.model.getSelectedItem();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    const event = new CustomEvent("sidebarToggle", {detail: this.collapsed});
    document.dispatchEvent(event);
  }

  getCollapsed() {
    return this.collapsed;
  }
}

export default new SidebarController();