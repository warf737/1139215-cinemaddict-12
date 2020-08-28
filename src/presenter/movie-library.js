import FilmCardView from "../view/card";
import DetailPopupView from "../view/popup";
import {remove, render, RenderPosition} from "../utils/render";
import {getRandomInteger} from "../utils/common";
import NoFilmCardsView from "../view/no-film-cards";
import LoadMoreButtonView from "../view/load-more-button";
import SortView from "../view/sort";
import {sortType} from "../const";

const CARDS_COUNT = 5;
const ADDITIONAL_CARDS_COUNT = 2;

const renderFilmCard = (filmListElement, film) => {
  const siteBody = document.querySelector(`body`);
  const closePopup = () => {
    remove(DetailPopupComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closePopup();
    }
  };

  const filmCardComponent = new FilmCardView(film);
  const DetailPopupComponent = new DetailPopupView(film);

  render(filmListElement, filmCardComponent, RenderPosition.BEFOREEND);

  filmCardComponent.setButtonsClickHandler(() => {
    siteBody.appendChild(DetailPopupComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  DetailPopupComponent.closeButtonClickHandler(() => {
    closePopup();
  });
};

const renderFilmCards = (filmElement, films) => {
  films.forEach((film) => {
    renderFilmCard(filmElement, film);
  });
};

const getSortedFilmCards = (films, sort, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sort) {
    case sortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    case sortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => b.date - a.date);
      break;
    case sortType.RATING_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class MovieList {

  constructor(container) {
    this._container = container;

    this._noFilmCards = new NoFilmCardsView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._sortComponent = new SortView();
  }

  render(films) {
    const container = this._container.getElement();
    const filmsListElement = container.querySelector(`.films-list`);

    const renderLoadMoreButton = () => {
      if (displayingCardsCount >= films.length) {
        return;
      }

      remove(this._loadMoreButton);

      // button 'show more'
      render(filmsListElement, this._loadMoreButton, RenderPosition.BEFOREEND);

      // показ карточек фильма по нажатию на кнопку показать больше
      this._loadMoreButton.setClickHandler(() => {
        const prevCards = displayingCardsCount;
        displayingCardsCount = displayingCardsCount + CARDS_COUNT;

        const sortedFilms = getSortedFilmCards(films, this._sortComponent.getSortType(), prevCards, displayingCardsCount);

        renderFilmCards(filmsListContainer, sortedFilms);

        if (displayingCardsCount >= films.length) {
          remove(this._loadMoreButton);
        }
      });
    };

    if (films.length < 1 || !films) {
      render(filmsListElement, new this._noFilmCards(), RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.AFTERBEGIN);

    // main - films - films-list - film
    const filmsListContainer = filmsListElement.querySelector(`.films-list__container`);

    let displayingCardsCount = CARDS_COUNT;
    renderFilmCards(filmsListContainer, films.slice(0, displayingCardsCount));

    renderLoadMoreButton();

    this._sortComponent.changeSortTypeHandler((type) => {
      displayingCardsCount = CARDS_COUNT;

      const sortedFilms = getSortedFilmCards(films, type, 0, 5);
      filmsListContainer.innerHTML = ``;

      renderFilmCards(filmsListContainer, sortedFilms);
      renderLoadMoreButton();
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
