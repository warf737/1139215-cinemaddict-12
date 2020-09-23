import {getFilmsByFilter} from "../utils/filter";
import {FilterType} from "../const";

export default class FilmCards {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._handlerDataChange = [];
    this._handlerFilterChange = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = [];
    films.forEach((film) => {
      const _film = Object.assign(
          {},
          film,
          {
            commentsCount: film.comments.length
          });
      delete _film.comments;
      this._films.push(_film);
    });
    this._callHandlers(this._handlerDataChange);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._handlerFilterChange);
  }

  updateFilm(id, film) {
    const index = this._films.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));
    this._callHandlers(this._handlerDataChange);
    return true;
  }

  setHandlerDataChange(handler) {
    this._handlerDataChange.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._handlerFilterChange.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
