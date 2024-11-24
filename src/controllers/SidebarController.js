import SidebarModel from "../models/SidebarModel";

class SidebarController {
  constructor() {
    this.model = new SidebarModel();
    this.collapsed = true;
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  getCollapsed() {
    return this.collapsed;
  }
}

export default new SidebarController();