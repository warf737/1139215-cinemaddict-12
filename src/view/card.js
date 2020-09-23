import {formatTime, formatDate} from "../utils/moment";
import {encode} from "he";
import Abstract from "./abstract-smart";


const createButtonMarkup = (name, isActive) => {
  return (
    `<button
    type="button"
    class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}"
    > ${name}
    </button>
      `
  );
};

const createCardTemplate = (film) => {
  const {title, rating, date, duration, genres, poster, currentDescription, commentsCount} = film;

  const watchListButton = createButtonMarkup(`add-to-watchlist`, film.isWatchlist);
  const historyButton = createButtonMarkup(`mark-as-watched`, film.isHistory);
  const favoriteButton = createButtonMarkup(`favorite`, film.isFavorite);
  const newDescription = currentDescription.length > 140 ? currentDescription.substr(0, 139) + `...` : currentDescription;
  const description = encode(newDescription);
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatDate(date)}</span>
        <span class="film-card__duration">${formatTime(duration)}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        ${watchListButton}
        ${historyButton}
        ${favoriteButton}
      </form>
    </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCardTemplate(this._film);
  }

  setButtonsClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => {
        element.addEventListener(`click`, handler);
      });
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setHistoryButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
