export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(day, quantity) {
    for (let i = 0; i < quantity; i++) {
      let newDate = new Date();
      newDate.setDate(day.getDate() + i);

      let newDay;
      if (newDate.getDate() <= 9) {
        newDay = "0" + newDate.getDate();
      } else {
        newDay = newDate.getDate();
      }

      let newMonth;
      if (newDate.getMonth() + 1 <= 9) {
        newMonth = "0" + (newDate.getMonth() + 1);
      } else {
        newMonth = newDate.getMonth() + 1;
      }

      this._renderer(`${newDay}.${newMonth}`);
    }
  }

  addItem(element) {
    document.querySelector(this._containerSelector).append(element);
  }
}
