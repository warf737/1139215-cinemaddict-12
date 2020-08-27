import FilmCardView from "../view/card";
import DetailPopupView from "../view/popup";
import {remove, render, RenderPosition} from "../utils/render";
import {getRandomInteger} from "../utils/common";
import NoFilmCardsView from "../view/no-film-cards";
import LoadMoreButtonView from "../view/load-more-button";

const CARDS_COUNT = 5;
const ADDITIONAL_CARDS_COUNT = 2;

const renderFilmCard = (filmListElement, film) => {
  const siteBody = document.querySelector(`body`);
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      siteBody.removeChild(DetailPopupComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const filmCardComponent = new FilmCardView(film);
  const DetailPopupComponent = new DetailPopupView(film);

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setButtonsClickHandler(() => {
    siteBody.appendChild(DetailPopupComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  DetailPopupComponent.setButtonClickHandler(() => {
    siteBody.removeChild(DetailPopupComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

export default class MovieList {

  constructor(container) {
    this._container = container;

    this._noFilmCards = new NoFilmCardsView();
    this._loadMoreButton = new LoadMoreButtonView();
  }

  render(films) {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);

    if (films.length < 1 || !films) {
      render(filmsListElement, new this._noFilmCards(), RenderPosition.BEFOREEND);
      return;
    }

    // main - films - films-list - film
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

    let displayingCardsCount = CARDS_COUNT;
    films.slice(0, displayingCardsCount)
      .forEach((film) => {
        renderFilmCard(filmsListContainerElement, film);
      });

    // button 'show more'
    render(filmsListElement, this._loadMoreButton, RenderPosition.BEFOREEND);

    // показ карточек фильма по нажатию на кнопку показать больше
    this._loadMoreButton.setClickHandler(() => {
      const prevCards = displayingCardsCount;
      displayingCardsCount = displayingCardsCount + CARDS_COUNT;

      films.slice(prevCards, displayingCardsCount)
        .forEach((film) =>
          renderFilmCard(filmsListContainerElement, film));

      if (displayingCardsCount >= films.length) {
        remove(this._loadMoreButton);
      }
    });

    // extra films
    const additionalFilmsElement = container.querySelectorAll(`.films-list--extra`);

    additionalFilmsElement.forEach((element) => {
      let elementContainer = element.querySelector(`.films-list__container`);
      for (let i = 0; i < ADDITIONAL_CARDS_COUNT; i++) {
        render(elementContainer, new FilmCardView(films[getRandomInteger(0, films.length - 1)]), RenderPosition.BEFOREEND);
      }
    });
  }
}
