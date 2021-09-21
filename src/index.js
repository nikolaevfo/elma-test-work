import BoardSection from "./components/BoardSection";
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

// Dates
const createDateCard = (data) => {
  const dateCard = new DateCard(data, ".date__card-template");
  return dateCard.generateCard();
};

const dateCardsList = new DateSection((item) => {
  dateCardsList.addItem(createDateCard(item));
}, ".board__date-list");

dateCardsList.renderItems(firstDayBoard, quantityDays);

// User row
// const createUserRow

// Tasks rows
// const createTasksRow = (data) => {
//   const tasksRow = new UserRow(data, ".board__tasks-row-template", ".board__tasks-card-template");
//   return tasksRow.generateRow(tasksData, firstDayBoard, quantityDays);
// };

// const tasksRows = new BoardSection((item) => {
//   tasksRows.addItem(createTasksRow(item));
// }, ".board__tasks-rows");

// tasksRows.renderRowsItems(usersData);

const usersRows = new UsersRows(
  ".board__tasks-rows",
  ".board__tasks-row-template",
  ".board__tasks-card-template",
);
usersRows.renderRowsItems(usersData, tasksData, firstDayBoard, quantityDays);
