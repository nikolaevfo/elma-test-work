export default class DateCard {
  constructor(data, cardSelector) {
    this._date = data;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".date__card-item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element.textContent = this._date;

    const todayData = new Date();
    if (this._date === todayData.toLocaleDateString().slice(0, -5)) {
      this._element.classList.add("date__card-item_active");
    }

    return this._element;
  }
}
