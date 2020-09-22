import AbstractSmartComponent from "./abstract-smart";
import {formatTime, formatPopupDate} from "../utils/moment";

const createGenresMarkup = (genres) => {
  return genres
    .map((genre) => {
      return (
        `<span class="film-details__genre">${genre}</span>`
      );
    })
    .join(`\n`);
};

const createEmojiListMarkup = (names) => {
  return names
    .map((emojiName) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiName}" value="${emojiName}">
          <label class="film-details__emoji-label" for="emoji-${emojiName}">
            <img src="./images/emoji/${emojiName}.png" width="30" height="30" alt="emoji">
          </label>`
      );
    })
    .join(`\n`);
};

const createCommentsWrapMarkup = (comments, commentsMarkup, emojiListMarkup) => {
  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiListMarkup}
          </div>
        </div>
      </section>`
  );
};

const createButtonMarkup = (name, content, isChecked) => {
  return (
    `<input type="checkbox" class="film-details__control-input film-details__control-input--${name} visually-hidden" id="${name}" name="${name}" ${isChecked ? `checked` : ``}>
      <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${content}</label>`
  );
};

const createPopUpTemplate = (film) => {
  const {poster, title, age, director, writers, actors, rating, date, duration, country, genres, description} = film;
  const genresMarkup = createGenresMarkup(genres);
  const genreTerm = genres.length > 1 ? `Genres` : `Genre`;

  const watchlistButton = createButtonMarkup(`watchlist`, `Add-to-watchlist`, film.isWatchlist);
  const historyButton = createButtonMarkup(`watched`, `Already watched`, film.isHistory);
  const favoritesButton = createButtonMarkup(`favorite`, `Add to favorites`, film.isFavorite);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${age}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating"> ${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatPopupDate(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatTime(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreTerm}</td>
                <td class="film-details__cell">
                  ${genresMarkup}
              </tr>
            </table>

            <p class="film-details__film-description">
               ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${watchlistButton}
          ${historyButton}
          ${favoritesButton}
        </section>
      </div>

      <div class="form-details__bottom-container">
      </div>
    </form>
  </section>`
  );
};

export default class DetailPopup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = null;
    this._watchListHandler = null;
    this._historyHandler = null;
    this._favoritesHandler = null;

    // this._subscribeToEvents();
  }

  getTemplate() {
    return createPopUpTemplate(this._film);
  }

  getFilm() {
    return this._film;
  }

  getData() {
    const form = this.getElement().querySelector(`film-details__inner`);
    const formData = new FormData(form);

    return {
      emoji: formData.get(`comment-emoji`),
      text: formData.get(`comment`)
    };
  }

  recoveryListeners() {
    this.closeButtonClickHandler(this._clickHandler);
    this.setWatchlistButtonClickHandler(this._watchListHandler);
    this.setHistoryButtonClickHandler(this._historyHandler);
    this.setFavoritesButtonClickHandler(this._favoritesHandler);
  }

  closeButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._clickHandler = handler;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`input#watchlist`)
      .addEventListener(`click`, handler);
    this._watchListHandler = handler;
  }

  setHistoryButtonClickHandler(handler) {
    this.getElement().querySelector(`input#watched`)
      .addEventListener(`click`, handler);
    this._historyHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`input#favorite`)
      .addEventListener(`click`, handler);
    this._favoritesHandler = handler;
  }

  getCommentsElement() {
    return this.getElement().querySelector(`.form-details__bottom-container`);
  }
}
