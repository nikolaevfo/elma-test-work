import BacklogCard from "./components/BacklogCard";
import BacklogSection from "./components/BacklogSection";
import DateCard from "./components/DateCard";
import DateSection from "./components/DateSection";
import UsersRows from "./components/UsersRows";
import "./index.css";

import { usersData } from "./utils/constants";
import { tasksData } from "./utils/constants";

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

      const dateEndTaskIncrease = new Date(dateEndTask);
      dateEndTaskIncrease.setDate(dateEndTaskIncrease.getDate() + 1);

      return dateStartTask <= thisDayDate && dateEndTaskIncrease >= thisDayDate;
    });

    thisWeekTasksData.push(thisDayTasks);
  }
}
toGetThisWeekTasksData(firstDayBoard);

// массив всех заданий без исполнителя =================================================
const tasksWithoutExecutor = tasksData.filter((item) => {
  return !item.executor;
});

// фильтрация заданий в backlog ========================================================
let filteredTasksWithoutExecutor = tasksWithoutExecutor;
const backlogForm = document.querySelector(".backlog__form");
const backlogFormInput = document.querySelector(".backlog__search-input");

function handlerBacklogFormSubmit(e) {
  e.preventDefault();
  const inputValue = backlogFormInput.value;
  if (inputValue) {
    filteredTasksWithoutExecutor = tasksWithoutExecutor.filter((item) => {
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
    filteredTasksWithoutExecutor = tasksWithoutExecutor;
  }

  clearAllItems();
  renderAllItems();
}

backlogForm.addEventListener("submit", handlerBacklogFormSubmit);
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
  return card.generateCard();
};

const backlogTasksList = new BacklogSection((item) => {
  backlogTasksList.addItem(createBacklogCard(item));
}, ".backlog__tasks-list");

// перезагрузка страницы при изменении размера экрана ==========================================
// function handleWindowResize() {
//   window.location.reload();
// }
// window.addEventListener("resize", handleWindowResize);

// renderAllItems clearAllItems =================================================================
function renderAllItems() {
  dateCardsList.renderItems(firstDayBoard, quantityDays);
  usersRows.renderRowsItems(usersData, thisWeekTasksData, firstDayBoard, quantityDays);
  backlogTasksList.renderItems(filteredTasksWithoutExecutor);
}
renderAllItems();

function clearAllItems() {
  dateCardsList.clearItems();
  usersRows.clearItems();
  backlogTasksList.clearItems();
}

// прокручивание недель ========================================================================
const nextWeekButton = document.querySelector(".board__nav-btn_right");
const lastWeekButton = document.querySelector(".board__nav-btn_left");

function onNextWeekClick() {
  clearAllItems();
  mondayDate.setDate(mondayDate.getDate() + 7);
  firstDayBoard.setDate(firstDayBoard.getDate() + 7);

  if (document.documentElement.clientWidth <= 1340) {
    firstDayBoard.setDate(mondayDate.getDate());
    quantityDays = 7;
  }

  toGetThisWeekTasksData(firstDayBoard);
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

nextWeekButton.addEventListener("click", onNextWeekClick);
lastWeekButton.addEventListener("click", onPreviousWeekClick);
