export default class DateSection {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(day, quantity) {
    for (let i = 0; i < quantity; i++) {
      let newDate = new Date();
      newDate.setDate(day.getDate() + i);

      this._renderer(newDate.toLocaleDateString().slice(0, -5));
    }
  }

  addItem(element) {
    document.querySelector(this._containerSelector).append(element);
  }
}
