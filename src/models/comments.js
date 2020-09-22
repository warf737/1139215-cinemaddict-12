export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = [];
  }

  setComments(films) {
    this._comments = [];
    films.forEach((film) => {
      film.comments.forEach((comment) => {
        this._comments.push(Object.assign(
            {},
            comment,
            {
              filmId: film.id
            }
        ));
      });
    });
  }

  getComments(film) {
    return this._comments.filter((comment) => comment.filmId === film.id);
  }

  getAllComments() {
    return this._comments;
  }

  removeComment(id) {
    const index = this._comments.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addComment(comment) {
    comment.id = Number(Date.now()) + Math.random();
    comment.author = `Server random`;
    comment.date = new Date().toISOString();
    this._comments = [].concat(comment, this._comments);
    this._callHandlers(this._dataChangeHandlers);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
