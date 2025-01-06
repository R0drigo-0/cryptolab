class SidebarModel {
  constructor() {
    this.selectedItem = null;
  }
  setSelectedItem(item) {
    this.selectedItem = item;
  }

  getSelectedItem() {
    return this.selectedItem;
  }
}

export default SidebarModel;