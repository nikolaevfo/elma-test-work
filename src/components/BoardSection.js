export default class BoardSection {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderRowsItems(users) {
    users.forEach((element) => {
      this._renderer(element);
    });
  }

  addItem(element) {
    document.querySelector(this._containerSelector).append(element);
  }
}
