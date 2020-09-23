import FilmCardView from "../view/card";
import DetailPopupView from "../view/popup";
import {replace, render, remove} from "../utils/render";
import CommentsPresenter from "./comments-list";

const siteBody = document.querySelector(`body`);

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

export default class FilmCardPresenter {
  constructor(container, commentsModel, onDataChange, onViewChange) {
    this._container = container;
    this._filmCardComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._commentsModel = commentsModel;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._detailPopupComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldDetailPopupComponent = this._detailPopupComponent;
    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._detailPopupComponent = new DetailPopupView(film);

    this._filmCardComponent.setButtonsClickHandler(() => {

      this._onViewChange();
      siteBody.appendChild(this._detailPopupComponent.getElement());
      this._renderComments();
      const popup = document.querySelector(`.film-details`);
      if (popup.length > 1) {
        siteBody.removeChild(popup[0]);
      }
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.EDIT;
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign(
          {},
          film,
          {
            isWatchlist: !film.isWatchlist
          }
      ));
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign(
          {},
          film,
          {
            isFavorite: !film.isFavorite
          }
      ));
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign(
          {},
          film,
          {
            isHistory: !film.isHistory
          }
      ));
    });

    this._detailPopupComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign(
          {},
          film,
          {
            isWatchlist: !film.isWatchlist
          }
      ));
    });

    this._detailPopupComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign(
          {},
          film,
          {
            isFavorite: !film.isFavorite
          }
      ));
    });

    this._detailPopupComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign(
          {},
          film,
          {
            isHistory: !film.isHistory
          }
      ));
    });

    this._detailPopupComponent.closeButtonClickHandler((evt) => {
      evt.preventDefault();
      this._closeCard();
    });

    if (oldDetailPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._detailPopupComponent, oldDetailPopupComponent);
      if (this._mode === Mode.EDIT) {
        this._renderComments();
      }
      document.addEventListener(`keydown`, this._onEscKeyDown);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }

  _renderComments() {
    new CommentsPresenter(this._detailPopupComponent, this._commentsModel, this._onDataChange.bind(this, this)).render();
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeCard();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _closeCard() {
    siteBody.removeChild(this._detailPopupComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeCard();
    }
  }
}
