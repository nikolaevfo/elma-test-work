export const backlogForm = document.querySelector('.backlog__form');
export const backlogFormInput = document.querySelector(
  '.backlog__search-input'
);
export const nextWeekButton = document.querySelector('.board__nav-btn_right');
export const lastWeekButton = document.querySelector('.board__nav-btn_left');
export const popupConfirmName = document.querySelector('.popup__title-name');
export const popupConfirmTask = document.querySelector('.popup__title-task');
export const popupConfirmButtonCancel = document.querySelector(
  '.popup__button-cancel'
);
export const popupConfirmButtonConfirm = document.querySelector(
  '.popup__button-confirm'
);

export const usersData = [
  {
    id: 1,
    username: 'user1',
    surname: 'Петров',
    firstName: 'Иван',
    secondName: '',
  },
  {
    id: 2,
    username: 'user2',
    surname: 'Иванов',
    firstName: 'Пётр',
    secondName: '',
  },
  {
    id: 3,
    username: 'user3',
    surname: 'Васильев',
    firstName: 'Артём',
    secondName: '',
  },
  {
    id: 4,
    username: 'user4',
    surname: 'Кузнецов',
    firstName: 'Сергей',
    secondName: '',
  },
  {
    id: 5,
    username: 'user5',
    surname: 'Некрасов',
    firstName: 'Артём',
    secondName: '',
  },
];

export const tasksData = [
  {
    id: 'bd83b1e9-ca06-4249-8fc7-7e5cca6428fe',
    subject: 'Анализ',
    description: 'Анализ проекта №105',
    creationAuthor: 1,
    executor: 1,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-20',
    planEndDate: '2021-09-22',
    endDate: '2021-09-20',
    status: 1,
    order: 1,
  },
  {
    id: '8ba3ba2d-2c6c-4bba-8952-14a973c1648e',
    subject: 'Планирование',
    description: 'Планирование проекта №104',
    creationAuthor: 1,
    executor: 1,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-21',
    planEndDate: '2021-09-22',
    endDate: '2021-09-20',
    status: 1,
    order: 1,
  },
  {
    id: 'eea75b18-0cc6-4cc4-a75c-64348ce76022',
    subject: 'Проектирование',
    description: 'Проектирование проекта №103',
    creationAuthor: 1,
    executor: 2,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-22',
    planEndDate: '2021-09-23',
    endDate: '2021-09-20',
    status: 1,
    order: 1,
  },
  {
    id: '3e2e9a19-c115-4326-9f6b-04223815c854',
    subject: 'Разработка',
    description: 'Разработка  проекта №102',
    creationAuthor: 1,
    executor: 3,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-22',
    planEndDate: '2021-09-27',
    endDate: '2021-09-20',
    status: 1,
    order: 1,
  },
  {
    id: '511e3770-e2f4-47c8-b9af-de91f20476f5',
    subject: 'Тестирование',
    description: 'Тестирование проекта №101',
    creationAuthor: 1,
    executor: null,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-20',
    planEndDate: '2021-09-24',
    endDate: '2021-09-20',
    status: 1,
    order: 1,
  },
  {
    id: '511e3770-e2f4-47c8-b9af-de91f20476f4',
    subject: 'Тестирование',
    description: 'Тестирование проекта №100',
    creationAuthor: 1,
    executor: null,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-24',
    planEndDate: '2021-09-27',
    endDate: '2021-09-20',
    status: 1,
    order: 1,
  },
  {
    id: '511e3770-e2f4-47c8-b9af-de91f20476f8',
    subject: 'Тестирование',
    description: 'Тестирование проекта №100',
    creationAuthor: 1,
    executor: null,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-23',
    planEndDate: '2021-09-27',
    endDate: '2021-09-20',
    status: 1,
    order: 1,
  },
  {
    id: '515e3770-e2f4-47c8-b9af-de91f20476f8',
    subject: 'Отладка',
    description: 'Устранение XSS уязвимостей',
    creationAuthor: 1,
    executor: 4,
    creationDate: '2021-09-20',
    planStartDate: '2021-09-20',
    planEndDate: '2021-09-21',
    endDate: undefined,
    status: 1,
    order: 1,
  },
  {
    id: '511e3770-e2f4-47c8-b3af-de91f20476f8',
    subject: 'Отладка',
    description: 'Устранение XSS уязвимостей 5',
    creationAuthor: 1,
    executor: null,
    creationDate: '2021-09-19',
    planStartDate: '2021-09-19',
    planEndDate: '2021-09-20',
    endDate: undefined,
    status: 1,
    order: 1,
  },
];
