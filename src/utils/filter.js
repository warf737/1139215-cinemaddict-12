import {FilterType} from "../const.js";

export const capitalizeFirstLetter = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export const getWatchlistFilms = (films) => {
  let newFilms = films.filter((film) => film.isWatchlist);
  return newFilms;
};

export const getHistoryFilms = (films) => {
  let newFilms = films.filter((film) => film.isHistory);
  return newFilms;
};

export const getFavoriteFilms = (films) => {
  let newFilms = films.filter((film) => film.isFavorite);
  return newFilms;
};

export const getFilmsByFilter = (films, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return films;
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
  }

  return films;
};
