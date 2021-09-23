import "./index.css";

import BacklogCard from "./components/BacklogCard";
import BacklogSection from "./components/BacklogSection";
import DateCard from "./components/DateCard";
import DateSection from "./components/DateSection";
import Popup from "./components/Popup";
import UsersRows from "./components/UsersRows";

import { usersData } from "./utils/constants";
import { tasksData } from "./utils/constants";

import { backlogForm } from "./utils/constants";
import { backlogFormInput } from "./utils/constants";
import { nextWeekButton } from "./utils/constants";
import { lastWeekButton } from "./utils/constants";
import { popupConfirmName } from "./utils/constants";
import { popupConfirmTask } from "./utils/constants";
import { popupConfirmButtonCancel } from "./utils/constants";
import { popupConfirmButtonConfirm } from "./utils/constants";

const date = new Date();
let mondayDate = new Date(date.setDate(date.getDate() + 1 - date.getDay()));
let firstDayBoard = new Date(date.setDate(mondayDate.getDate() - 3));
let quantityDays = 14;

// устанавливаем количество колонок ====================================================
if (document.documentElement.clientWidth <= 1340) {
  firstDayBoard = new Date(date.setDate(mondayDate.getDate()));
  quantityDays = 7;
}

// массив заданий на текущий период времени по дням =====================================
let thisWeekTasksData;
function toGetThisWeekTasksData(firstDay) {
  thisWeekTasksData = [];
  for (let i = 0; i < quantityDays; i++) {
    const thisDayDate = new Date(firstDay);
    thisDayDate.setDate(thisDayDate.getDate() + i);

    const thisDayTasks = tasksData.filter((item) => {
      const dateStartTask = new Date(item.planStartDate);
      const dateEndTask = new Date(item.planEndDate);
      const todayDay = new Date();

      const dateEndTaskIncrease = new Date(dateEndTask);
      dateEndTaskIncrease.setDate(dateEndTaskIncrease.getDate() + 1);

      return (
        (dateStartTask <= thisDayDate && dateEndTaskIncrease >= thisDayDate) ||
        (!item.endDate && thisDayDate <= todayDay && thisDayDate >= dateStartTask)
      );
    });

    thisWeekTasksData.push(thisDayTasks);
  }
}
toGetThisWeekTasksData(firstDayBoard);

// массив всех заданий без исполнителя =================================================
let tasksWithoutExecutor;
function toGetTasksWithoutExecutor() {
  tasksWithoutExecutor = tasksData.filter((item) => {
    return !item.executor;
  });
}

// фильтрация заданий в backlog ========================================================
let renderedTasksWithoutExecutor;
function toGetRenderedTasksWithoutExecutor() {
  toGetTasksWithoutExecutor();
  renderedTasksWithoutExecutor = tasksWithoutExecutor;
}
toGetRenderedTasksWithoutExecutor();

function clearBacklogItems() {
  backlogTasksList.clearItems();
}
function renderBacklogItems() {
  backlogTasksList.renderItems(renderedTasksWithoutExecutor);
}

function filteringBacklogTasks(inputValue) {
  if (inputValue) {
    renderedTasksWithoutExecutor = tasksWithoutExecutor.filter((item) => {
      const valuesArray = Object.values(item);
      let result = false;
      valuesArray.forEach((value) => {
        if (value && value.toString().includes(inputValue)) {
          result = true;
        }
      });
      return result;
    });
  } else {
    renderedTasksWithoutExecutor = tasksWithoutExecutor;
  }
}

function handlerBacklogFormSubmit(e) {
  e.preventDefault();
  const inputValue = backlogFormInput.value;

  filteringBacklogTasks(inputValue);

  clearBacklogItems();
  renderBacklogItems();
}

// Dates ==============================================================================
const createDateCard = (data) => {
  const dateCard = new DateCard(data, ".date__card-template");
  return dateCard.generateCard();
};

const dateCardsList = new DateSection((item) => {
  dateCardsList.addItem(createDateCard(item));
}, ".board__date-list");

// Tasks rows ============================================================================
const usersRows = new UsersRows(
  ".board__tasks-rows",
  ".board__tasks-row-template",
  ".board__tasks-card-template",
);

// backlog tasks ==========================================================================
const createBacklogCard = (item) => {
  const card = new BacklogCard(item, usersData, ".backlog__tasks-item-template");
  return card.generateCard(onDragStartHandler);
};

const backlogTasksList = new BacklogSection((item) => {
  backlogTasksList.addItem(createBacklogCard(item));
}, ".backlog__tasks-list");

// renderAllItems clearAllItems =================================================================
function renderAllItems() {
  toGetThisWeekTasksData(firstDayBoard);
  toGetRenderedTasksWithoutExecutor();

  if (backlogFormInput.value) {
    filteringBacklogTasks(backlogFormInput.value);
  }

  dateCardsList.renderItems(firstDayBoard, quantityDays);
  usersRows.renderRowsItems(
    usersData,
    thisWeekTasksData,
    firstDayBoard,
    quantityDays,
    onDropHandler,
  );
  renderBacklogItems();
}
renderAllItems();

function clearAllItems() {
  dateCardsList.clearItems();
  usersRows.clearItems();
  clearBacklogItems();
}

// прокручивание недель ========================================================================
function onNextWeekClick() {
  clearAllItems();
  mondayDate.setDate(mondayDate.getDate() + 7);
  firstDayBoard.setDate(firstDayBoard.getDate() + 7);

  if (document.documentElement.clientWidth <= 1340) {
    firstDayBoard.setDate(mondayDate.getDate());
    quantityDays = 7;
  }

  renderAllItems();
}

function onPreviousWeekClick() {
  clearAllItems();
  mondayDate.setDate(mondayDate.getDate() - 7);
  firstDayBoard.setDate(firstDayBoard.getDate() - 7);

  if (document.documentElement.clientWidth <= 1340) {
    firstDayBoard.setDate(mondayDate.getDate());
    quantityDays = 7;
  }

  toGetThisWeekTasksData(firstDayBoard);
  renderAllItems();
}

// drag and drop ==================================================================================
let dragTaskId;
let dropAreaAuthor;
let dropAreaDate;
let dropItem;

function onDragStartHandler(event) {
  dragTaskId = event.target.id;
}

function dropTaskHandler() {
  tasksData.map((task) => {
    if (task.id === dragTaskId) {
      task.executor = parseInt(dropAreaAuthor, 10);
      const dateNewFormat = dropAreaDate.split(".").reverse().join("-");
      task.planStartDate = dateNewFormat;
      task.planEndDate = dateNewFormat;
    }
  });

  clearAllItems();
  renderAllItems();
}

function dropAuthorHandler() {
  tasksData.map((task) => {
    if (task.id === dragTaskId) {
      task.executor = parseInt(dropAreaAuthor, 10);
    }
  });

  clearAllItems();
  renderAllItems();
}

function onDropHandler(event) {
  dropItem = event.target;
  dropAreaAuthor = dropItem.closest(".board__tasks-row-item").id;

  console.log(dragTaskId);
  const user = usersData.find((item) => item.id === Number(dropAreaAuthor));
  const task = tasksData.find((item) => item.id === dragTaskId);
  popupConfirmName.textContent = `${user.firstName} ${user.surname}`;
  popupConfirmTask.textContent = task.subject;
  popupConfirm.open();
}

// Popup Confirm ========================================================================================
const popupConfirm = new Popup(".popup-confirm");

popupConfirm.setEventListeners();

function handlerPopupConfirm() {
  if (dropItem.classList.contains("board__tasks-row-header")) {
    dropAuthorHandler();
  } else {
    dropAreaDate = dropItem.closest(".board__tasks-user-list").id;
    dropTaskHandler();
  }
}

// Listeners ============================================================================================
backlogForm.addEventListener("submit", handlerBacklogFormSubmit);

nextWeekButton.addEventListener("click", onNextWeekClick);

lastWeekButton.addEventListener("click", onPreviousWeekClick);

popupConfirmButtonCancel.addEventListener("click", () => {
  popupConfirm.close();
});

popupConfirmButtonConfirm.addEventListener("click", () => {
  handlerPopupConfirm();
  popupConfirm.close();
});
