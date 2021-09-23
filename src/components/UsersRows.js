export default class UsersRows {
  constructor(containerSelector, rowSelector, cardSelector) {
    this._containerSelector = containerSelector;
    this._rowSelector = rowSelector;
    this._cardSelector = cardSelector;
  }

  renderRowsItems(usersData, tasksData, firstDay, quantity, onDropHandler) {
    usersData.forEach((item) => {
      this._addItem(this._generateRow(item, tasksData, firstDay, quantity, onDropHandler));
    });
  }

  _addItem(element) {
    document.querySelector(this._containerSelector).append(element);
  }

  clearItems() {
    document.querySelector(this._containerSelector).textContent = "";
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

  _setEventListeners(item, onDropHandler) {
    item.addEventListener("dragover", (evt) => {
      evt.preventDefault();
    });
    item.addEventListener("drop", (evt) => {
      onDropHandler(evt);
    });
    item.addEventListener("dragenter ", (e) => {
      console.log(e.target);
    });
  }

  _addTasks(thisUserTasks, thisCardDate, newCard, todayData) {
    if (thisUserTasks.length > 0) {
      thisUserTasks.forEach((element) => {
        const newUserTask = this._getUserTaskTemplate();
        newUserTask.querySelector(".board__tasks-user-list-item-header").textContent =
          element.subject;
        newUserTask.querySelector(".board__task-submenu-item-description").textContent =
          element.description;
        newUserTask.querySelector(".board__task-submenu-item-creationDate").textContent =
          element.creationDate;
        newUserTask.querySelector(".board__task-submenu-item-planStartDate").textContent =
          element.planStartDate;
        newUserTask.querySelector(".board__task-submenu-item-planEndDate").textContent =
          element.planEndDate;

        // проверка, просрочено ли задание
        const thisCardDateNewFormat = thisCardDate.split(".").reverse().join("-");

        if (
          !element.endDate &&
          element.planEndDate < thisCardDateNewFormat &&
          thisCardDate <= todayData
        ) {
          newUserTask.classList.add("board__tasks-user-list-item_varning");
        }

        newCard.querySelector(".board__tasks-card-item-list").append(newUserTask);
      });
    }
  }
  _addCardsToRow(rowsList, userData, thisBoardTasksData, firstDay, quantity, onDropHandler) {
    for (let i = 0; i < quantity; i++) {
      const newCard = this._getCardTemplate();

      const thisCardDate = new Date(firstDay);
      thisCardDate.setDate(thisCardDate.getDate() + i);
      thisCardDate = thisCardDate.toLocaleDateString();

      newCard.id = thisCardDate;
      this._setEventListeners(newCard, onDropHandler);

      // выделение сегодняшнего дня
      const todayData = new Date();
      todayData = todayData.toLocaleDateString();

      if (thisCardDate === todayData) {
        newCard.classList.add("board__tasks-user-list_active");
      }

      const dayTasks = thisBoardTasksData[i];
      const thisUserTasks = dayTasks.filter((item) => {
        return item.executor === userData.id;
      });

      this._addTasks(thisUserTasks, thisCardDate, newCard, todayData);

      rowsList.append(newCard);
    }
  }

  _generateRow(userData, thisBoardTasksData, firstDay, quantity, onDropHandler) {
    const rowElement = this._getRowTemplate();
    rowElement.id = userData.id;
    const header = rowElement.querySelector(".board__tasks-row-header");
    header.textContent = userData.firstName + " " + userData.surname;
    this._setEventListeners(header, onDropHandler);

    const rowsList = rowElement.querySelector(".board__tasks-cards-list");
    this._addCardsToRow(rowsList, userData, thisBoardTasksData, firstDay, quantity, onDropHandler);

    return rowElement;
  }
}
