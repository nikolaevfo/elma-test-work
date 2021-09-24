import Section from './Section';

export default class DateSection extends Section {
  constructor(renderer, containerSelector) {
    super(containerSelector);
    this._renderer = renderer;
  }

  renderItems(firstDay, quantity) {
    for (let i = 0; i < quantity; i++) {
      const newDate = new Date(firstDay);
      newDate.setDate(newDate.getDate() + i);

      this._renderer(newDate.toLocaleDateString().slice(0, -5));
    }
  }
}
