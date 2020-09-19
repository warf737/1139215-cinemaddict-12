import FilmCardView from "../view/card";
import DetailPopupView from "../view/popup";
import {remove, replace, render, RenderPosition} from "../utils/render";

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
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldDetailPopupComponent = this._detailPopupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._detailPopupComponent = new DetailPopupView(film);

    const siteBody = document.querySelector(`body`);

    if (oldFilmCardComponent && oldDetailPopupComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._detailPopupComponent, oldDetailPopupComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);

    this._filmCardComponent.setButtonsClickHandler(() => {
      siteBody.appendChild(this._detailPopupComponent.getElement());
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isWatchlist: !film.isWatchlist}));
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isfavorite}));
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {isFavorite: !film.isFavorite}));
    });

    this._detailPopupComponent.closeButtonClickHandler(() => {
      this._closeCard();
    });
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {}
    this._closeCard();
  }

  _closeCard() {
    remove(this._detailPopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._closeCard().reset();
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeCard();
    }
  }
}
