import FilmCardView from "../view/card";
import DetailPopupView from "../view/popup";
import {replace, render, remove, RenderPosition} from "../utils/render";

const siteBody = document.querySelector(`body`);

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`
};

export default class FilmCardPresenter {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._filmCardComponent = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._detailPopupComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldDetailPopupComponent = this._detailPopupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._detailPopupComponent = new DetailPopupView(film);

    this._filmCardComponent.setButtonsClickHandler(() => {
      this._onViewChange();
      siteBody.appendChild(this._detailPopupComponent.getElement());
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._mode = Mode.EDIT;
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isWatchlist: !film.isWatchlist}));
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isHistory: !film.isHistory}));
    });

    this._detailPopupComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isWatchlist: !film.isWatchlist}));
      this._mode = Mode.EDIT;
    });

    this._detailPopupComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
      this._mode = Mode.EDIT;
    });

    this._detailPopupComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isHistory: !film.isHistory}));
      this._mode = Mode.EDIT;
    });

    this._detailPopupComponent.closeButtonClickHandler((evt) => {
      evt.preventDefault();
      this._closeCard();
    });

    if (oldFilmCardComponent && oldDetailPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      if (siteBody.contains(oldDetailPopupComponent.getElement())) {
        replace(this._detailPopupComponent, oldDetailPopupComponent);
      }
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeCard();
    }
  }

  destroy() {
    remove(this._detailPopupComponent);
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
