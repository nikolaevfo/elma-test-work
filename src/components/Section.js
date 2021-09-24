export default class Section {
  constructor(containerSelector) {
    this._containerSelector = containerSelector;
  }

  addItem(element) {
    document.querySelector(this._containerSelector).append(element);
  }

  clearItems() {
    document.querySelector(this._containerSelector).textContent = '';
  }
}
