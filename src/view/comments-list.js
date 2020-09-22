import {emojies} from "../const";
import AbstractComponent from "./abstract";

const createEmojiListMarkup = (names) => {
  return names.map((emoji) => {
    return (`
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
       <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>
    `);
  })
    .join(`\n`);
};

const createDetailPopupTemplate = (film) => {
  const emojiesMarkup = createEmojiListMarkup(emojies);
  const {commentsCount} = film;
  return (`
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

        <ul class="film-details__comments-list"></ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiesMarkup}
          </div>
        </div>
      </section>
  `);
};

export default class FilmDetail extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;

    this._subscribeToEvents();
  }

  getTemplate() {
    return createDetailPopupTemplate(this._film);
  }

  getCommentsListElement() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  setButtonKeydownHandler(handler) {
    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, handler);
  }

  _subscribeToEvents() {
    const element = this.getElement();

    const emojiElement = element.querySelector(`.film-details__add-emoji-label`);
    element.querySelectorAll(`.film-details__emoji-label`)
      .forEach((el) => {
        el.addEventListener(`click`, () => {
          const link = el.querySelector(`img`).src;
          emojiElement.innerHTML = `<img src=${link} width="55" height="55" alt="emoji">`;
        });
      });
  }
}
