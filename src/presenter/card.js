import FilmCardView from "../view/card";
import DetailPopupView from "../view/popup";
import {remove, render, RenderPosition} from "../utils/render";

export default class FilmCardPresenter {
  constructor(container) {
    this._container = container;
    this._filmCardComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmCardComponent = new FilmCardView(film);
    this._detailPopupComponent = new DetailPopupView(film);

    const siteBody = document.querySelector(`body`);

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);

    this._filmCardComponent.setButtonsClickHandler(() => {
      siteBody.appendChild(this._detailPopupComponent.getElement());
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._filmCardComponent.setWatchlistButtonClickHandler(() => {
      console.log(`watchlist`);
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
      console.log(`favorites`);
    });

    this._filmCardComponent.setHistoryButtonClickHandler(() => {
      console.log(`history`);
    });

    this._detailPopupComponent.closeButtonClickHandler(() => {
      this._closeCard();
    });
  }

  _closeCard() {
    remove(this._detailPopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeCard();
    }
  }
}
