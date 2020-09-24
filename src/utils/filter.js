import {FilterType} from "../const.js";

const getWatchlistFilms = (films) => {
  let newFilms = films.filter((film) => film.isWatchlist);
  return newFilms;
};

const getHistoryFilms = (films) => {
  let newFilms = films.filter((film) => film.isHistory);
  return newFilms;
};

const getFavoriteFilms = (films) => {
  let newFilms = films.filter((film) => film.isFavorite);
  return newFilms;
};

const getFilmsByFilter = (films, filterType) => {

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

export {getWatchlistFilms, getHistoryFilms, getFavoriteFilms, getFilmsByFilter};
