import {getRandomInteger, getNewArray} from '../utils/common';

const getRating = () => {
  const min = 1;
  const max = 9;
  return ((Math.random() * (max - min + 1)) + min). toPrecision(2);
};

const generateFilmCard = () => {
  const titles = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`
  ];
  const ages = [
    `18`,
    `6`,
    `12`
  ];
  const directors = [
    `Anthony Mann`,
    `Heinz Herald`,
    `Richard Weil`
  ];
  const writers = [
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`
  ];
  const actors = [
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`
  ];
  const genres = [
    ` Drama`,
    ` Film-Noir`,
    ` Mystery`,
    ` Drama`,
    ` Film-Noir`,
    ` Mystery`];
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ];
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];
  const countries = [
    `USA`,
    `Russia`,
    `Australia`
  ];
  const startDate = new Date(1920, 3, 5).getTime();
  const startDateComment = new Date(2020, 1, 5).getTime();
  const finalDate = new Date(2020, 3, 27).getTime();
  const durations = [`1h 20m`, `2h 15m`, `1h 45m`];
  // const booleanValues = [`true`, `false`];
  const comments = [{
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    emoji: `smile`,
    day: new Date(getRandomInteger(startDateComment, finalDate))
  }, {
    text: `Booooooooooring`,
    author: `John Doe`,
    emoji: `sleeping`,
    day: new Date(getRandomInteger(startDateComment, finalDate))
  }, {
    text: `Very very old. Meh`,
    author: `John Doe`,
    emoji: `puke`,
    day: new Date(getRandomInteger(startDateComment, finalDate))
  }, {
    text: `Almost two hours? Seriously?`,
    author: `John Doe`,
    emoji: `angry`,
    day: new Date(getRandomInteger(startDateComment, finalDate))
  }];

  return {
    title: titles[getRandomInteger(0, titles.length - 1)],
    age: ages[getRandomInteger(0, ages.length - 1)],
    director: directors[getRandomInteger(0, directors.length - 1)],
    writers: getNewArray(writers).join(`, `),
    actors: getNewArray(actors).join(`, `),
    rating: getRating(),
    date: new Date(getRandomInteger(startDate, finalDate)),
    genres: getNewArray(genres),
    poster: posters[getRandomInteger(0, posters.length - 1)],
    description: getNewArray(descriptions, getRandomInteger(0, descriptions.length - 1)).join(` `),
    country: countries[getRandomInteger(0, countries.length - 1)],
    comments: getNewArray(comments),
    isFavorite: Math.random() > 0.5,
    isHistory: Math.random() > 0.5,
    isWatchlist: Math.random() > 0.5,
    duration: durations[getRandomInteger(0, durations.length - 1)],
  };
};

const generateFilmCards = (count) => {
  return Array.from({length: count}, generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
