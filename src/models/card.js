export default class FilmCards {
  constructor() {
    this._films = [];

    this._handlerDataChange = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._handlerDataChange);
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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
