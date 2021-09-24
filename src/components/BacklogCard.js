export default class BacklogCard {
  constructor(task, users, cardSelector) {
    this._task = task;
    this._users = users;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.backlog__tasks-item')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(onDragStartHandler) {
    this._element.addEventListener('dragstart', (evt) => {
      onDragStartHandler(evt);
    });
  }

  generateCard(onDragStartHandler) {
    this._element.id = this._task.id;
    this._setEventListeners(onDragStartHandler);
    const author = this._users.find((item) => {
      return item.id === this._task.creationAuthor;
    });

    this._element.querySelector('.backlog__tasks-item-name').textContent =
      author.firstName + ' ' + author.surname;
    this._element.querySelector(
      '.backlog__tasks-item-description'
    ).textContent = this._task.description;

    return this._element;
  }
}
