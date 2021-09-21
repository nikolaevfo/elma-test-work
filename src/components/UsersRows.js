export default class UsersRows {
  constructor(containerSelector, rowSelector, cardSelector) {
    this._containerSelector = containerSelector;
    this._rowSelector = rowSelector;
    this._cardSelector = cardSelector;
  }

  renderRowsItems(usersData, tasksData, firstDay, quantity) {
    usersData.forEach((item) => {
      this._addItem(this._generateRow(item, tasksData, firstDay, quantity));
    });
  }

  _addItem(element) {
    document.querySelector(this._containerSelector).append(element);
  }

  _getRowTemplate() {
    const element = document
      .querySelector(this._rowSelector)
      .content.querySelector(".board__tasks-row-item")
      .cloneNode(true);

    return element;
  }

  _getCardTemplate() {
    const element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".board__tasks-user-list")
      .cloneNode(true);

    return element;
  }

  _getUserTaskTemplate() {
    const element = document
      .querySelector(".board__tasks-user-list-item-template")
      .content.querySelector(".board__tasks-user-list-item")
      .cloneNode(true);

    return element;
  }

  _generateRow(userData, thisBoardTasksData, firstDay, quantity) {
    const rowElement = this._getRowTemplate();
    rowElement.id = userData.id;
    const header = rowElement.querySelector(".board__tasks-row-header");
    header.textContent = userData.firstName + " " + userData.surname;

    const rowsList = rowElement.querySelector(".board__tasks-cards-list");
    for (let i = 0; i < quantity; i++) {
      const newCard = this._getCardTemplate();

      let thisCardDate = new Date();
      thisCardDate.setDate(firstDay.getDate() + i);
      newCard.id = thisCardDate.toLocaleDateString();

      const dayTasks = thisBoardTasksData[i];

      const thisUserTasks = dayTasks.filter((item) => {
        return item.executor === userData.id;
      });

      if (thisUserTasks.length > 0) {
        for (let i = 0; i <= thisUserTasks.length; i++) {
          const newUserTask = this._getUserTaskTemplate();
          newUserTask.textContent = thisUserTasks[0].subject;
          newCard.querySelector(".board__tasks-card-item-list").append(newUserTask);
        }
      }

      rowsList.append(newCard);
    }

    return rowElement;
  }
}