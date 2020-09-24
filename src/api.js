import FilmCard from "./models/card";
import Comment from "./models/comment";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

const checkStatus = (response) => {
  if (response.status >= SuccessHTTPStatusRange.MIN && response.status < SuccessHTTPStatusRange.MAX) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then((res) => res.json())
      .then(FilmCard.parseFilmCards);
  }

  getComments({id}) {
    return this._load({url: `comments/${id}`})
      .then((res) => res.json())
      .then((data) => Comment.parseComment(data, id));
  }

  createComment(comment, filmId) {
    return this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((res) => res.json())
      .then(({movie, comments}) => {
        return {
          ids: movie.comments,
          models: Comment.parseComments(comments, filmId)
        };
      });
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      bode: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((res)=> res.json())
      .then(FilmCard.parseFilmCard);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err)=> {
        throw new Error(`${err.status}: ${err.statusText}`);
      });
  }
}
