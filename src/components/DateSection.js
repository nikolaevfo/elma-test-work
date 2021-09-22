import Section from "./Section";

export default class DateSection extends Section {
  constructor(renderer, containerSelector) {
    super(containerSelector);
    this._renderer = renderer;
  }

  renderItems(day, quantity) {
    const year = day.getFullYear();
    const month = day.getMonth();
    const dayData = day.getDate();
    const newDate = new Date(year, month, dayData);
    for (let i = 0; i < quantity; i++) {
      newDate.setDate(day.getDate() + i);

      this._renderer(newDate.toLocaleDateString().slice(0, -5));
    }
  }
}
