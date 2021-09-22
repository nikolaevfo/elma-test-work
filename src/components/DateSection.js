import Section from "./Section";

export default class DateSection extends Section {
  constructor(renderer, containerSelector) {
    super(containerSelector);
    this._renderer = renderer;
  }

  renderItems(day, quantity) {
    for (let i = 0; i < quantity; i++) {
      let newDate = new Date();
      newDate.setDate(day.getDate() + i);

      this._renderer(newDate.toLocaleDateString().slice(0, -5));
    }
  }
}
