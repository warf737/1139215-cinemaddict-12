import {getRandomInteger} from './utils';

// функция для генерации случайного Названия
const generateTitles = () => {
  const titles = [
    `Бегущий по лезвию`,
    `Назад в будущее`,
    `Звездные войны`,
    `Дюна`,
    `Затерянные в космосе`,
    `Чужой`,
    `Аполлон 12`,
    `Терминатор`,
    `Звездные врата`,
    `Звездный путь`,
    `Вспомнить все`
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

// функция для генерации случайного постера
const generatePosters = () => {
  const path = `/public/images/posters/`;
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sindbad.png`,
    `sagebrush-trail.png`,
    `santa-claus-conquers-the-martians.png`,
    `the-dance-of-life.png`,
    `the-great-flamarion.png`,
    `the-man-with-the-golden-arm.png`,
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return path + posters[randomIndex];
};

// функция для генерации случайного описания
const generateDescription = () => {
  const descriptionLength = getRandomInteger(1, 5);
  const phrases = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  let description = [];
  for (let i = 0; i <= descriptionLength; i++) {
    const randomIndex = getRandomInteger(0, phrases.length - 1);
    description.push(phrases[randomIndex]);
  }

  return description.toString();
};
