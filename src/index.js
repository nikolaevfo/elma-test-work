import DateCard from "./components/DateCard";
import DateSection from "./components/DateSection";
import UsersRows from "./components/UsersRows";
import "./index.css";

// import Api from "./components/Api.js";
import { usersData } from "./utils/constants";
import { tasksData } from "./utils/constants";

const date = new Date();
const mondayDate = new Date(date.setDate(date.getDate() - date.getDay()));
const firstDayBoard = new Date(date.setDate(mondayDate.getDate() - 3));
const quantityDays = 14;

// const lastDayBoard = new Date(date.setDate(mondayDate.getDate() + 11));
// console.log(lastDayBoard);

const thisBoardTasksData = [];
for (let i = 0; i < quantityDays; i++) {
  let thisDayDate = new Date();
  thisDayDate.setDate(firstDayBoard.getDate() + i);

  const thisDayTasks = tasksData.filter((item) => {
    const dateStartTask = new Date(item.planStartDate);
    const dateEndTask = new Date(item.planEndDate);
    const dateEndTaskIncrease = new Date();
    dateEndTaskIncrease.setDate(dateEndTask.getDate() + 1);

    return dateStartTask <= thisDayDate && dateEndTaskIncrease >= thisDayDate;
  });

  thisBoardTasksData.push(thisDayTasks);
}

// Dates
const createDateCard = (data) => {
  const dateCard = new DateCard(data, ".date__card-template");
  return dateCard.generateCard();
};

const dateCardsList = new DateSection((item) => {
  dateCardsList.addItem(createDateCard(item));
}, ".board__date-list");

dateCardsList.renderItems(firstDayBoard, quantityDays);

// Tasks rows
const usersRows = new UsersRows(
  ".board__tasks-rows",
  ".board__tasks-row-template",
  ".board__tasks-card-template",
);
usersRows.renderRowsItems(usersData, thisBoardTasksData, firstDayBoard, quantityDays);
