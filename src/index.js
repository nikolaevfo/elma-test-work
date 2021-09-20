import DateCard from "./components/DateCard";
import DateSection from "./components/DateSection";
import "./index.css";

// import Api from "./components/Api.js";
import { usersData } from "./utils/constants";
import { tasksData } from "./utils/constants";

const date = new Date();

const mondayDate = new Date(date.setDate(date.getDate() - date.getDay()));

const firstDayBoard = new Date(date.setDate(mondayDate.getDate() - 4));

// const lastDayBoard = new Date(date.setDate(mondayDate.getDate() + 11));
// console.log(lastDayBoard);

const createDateCard = (data) => {
  const dateCard = new DateCard(data, ".date__card-template");
  return dateCard.generateCard();
};

const dateCardsList = new DateSection((item) => {
  dateCardsList.addItem(createDateCard(item));
}, ".board__date-list");

dateCardsList.renderItems(firstDayBoard, 14);
