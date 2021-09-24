import Section from './Section';

export default class BacklogSection extends Section {
  constructor(renderer, containerSelector) {
    super(containerSelector);
    this._renderer = renderer;
  }

  renderItems(cards) {
    cards.forEach((element) => {
      this._renderer(element);
    });
  }
}
