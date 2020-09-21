import FilmCardView from "../view/card";
import {remove, render, RenderPosition} from "../utils/render";
import {getRandomInteger} from "../utils/common";
import NoFilmCardsView from "../view/no-film-cards";
import LoadMoreButtonView from "../view/load-more-button";
import SortView from "../view/sort";
import {sortType} from "../const";
import CardPresenter from "./card";

const CARDS_COUNT = 5;
const ADDITIONAL_CARDS_COUNT = 2;

const renderFilmCards = (filmElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const cardPresenter = new CardPresenter(filmElement, onDataChange, onViewChange);
    cardPresenter.render(film);
    return cardPresenter;
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
      sortedFilms = showingFilms.sort((a, b) => a.date - b.date);
      break;
    case sortType.RATING_DOWN:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class BoardPresenter {

  constructor(container, filmCardModel) {
    this._container = container.getElement();
    this._filmCardModel = filmCardModel;

    this._showedFilmCards = [];
    this._displayingCardsCount = CARDS_COUNT;
    this._noFilmCards = new NoFilmCardsView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._sortComponent = new SortView();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.changeSortTypeHandler(this._onSortTypeChange);

    this._filmsListElement = this._container.querySelector(`.films-list`);
    this._filmsListContainer = this._filmsListElement.querySelector(`.films-list__container`);

    this._films = this._filmCardModel.getFilms();
  }

  render() {
    if (this._filmCardModel.length === 0) {
      render(this._filmsListElement, new this._noFilmCards(), RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._renderFilmsCards(this._films.slice(0, this._displayingCardsCount));
    this._renderLoadMoreButton();

    // extra films
    const additionalFilmsElement = this._container.querySelectorAll(`.films-list--extra`);

    additionalFilmsElement.forEach((element) => {
      let elementContainer = element.querySelector(`.films-list__container`);
      for (let i = 0; i < ADDITIONAL_CARDS_COUNT; i++) {
        render(elementContainer, new FilmCardView(this._films[getRandomInteger(0, this._films.length - 1)]), RenderPosition.BEFOREEND);
      }
    });
  }

  _renderFilmsCards(films) {
    const newFilmCards = renderFilmCards(this._filmsListContainer, films, this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(newFilmCards);

    this._displayingCardsCount = this._showedFilmCards.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButton);
    if (this._displayingCardsCount >= this._films.length) {
      return;
    }

    // button 'show more'
    render(this._filmsListElement, this._loadMoreButton, RenderPosition.BEFOREEND);

    // показ карточек фильма по нажатию на кнопку показать больше
    this._loadMoreButton.setClickHandler(() => {
      const prevCards = this._displayingCardsCount;
      this._displayingCardsCount = this._displayingCardsCount + CARDS_COUNT;

      const sortedFilms = getSortedFilmCards(this._films, this._sortComponent.getSortType(), prevCards, this._displayingCardsCount);
      const newFilmCards = renderFilmCards(this._filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
      this._showedFilmCards = this._showedFilmCards.concat(newFilmCards);
    });
  }

  _onSortTypeChange(sort) {
    this._displayingCardsCount = CARDS_COUNT;
    const sortedFilms = getSortedFilmCards(this._films, sort, 0, this._displayingCardsCount);

    this._filmsListContainer.innerHTML = ``;

    this._showedFilmCards = renderFilmCards(this._filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
    this._renderLoadMoreButton();

  }

  _onDataChange(filmCardPresenter, oldData, newData) {
    const isSuccess = this._filmCardModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      filmCardPresenter.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmCards.forEach((film) => film.setDefaultView());
  }
}
