import moment from "moment";

// функция для генерации случайного числа из диапазона
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// функция для перемешивания массива
export const getNewArray = (arr, arrLength = arr.length - 1) => {
  const array = [];
  for (let i = 0; i <= getRandomInteger(0, arrLength); i++) {
    array.push(arr[i]);
  }
  return array;
};

export const isSelectedType = (dateA, dateB, type) => {
  if (type === null) {
    return true;
  }
  return moment(dateA).diff(moment(dateB), type) === 0;
};

export const getDuration = (time) => {
  return moment.duration(time, `minutes`);
};
