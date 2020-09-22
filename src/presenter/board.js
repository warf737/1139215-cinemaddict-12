import {remove, render, RenderPosition} from "../utils/render";
import NoFilmCardsView from "../view/no-film-cards";
import LoadMoreButtonView from "../view/load-more-button";
import SortView from "../view/sort";
import {sortType} from "../const";
import CardPresenter from "./card";
import UserAvatar from "../view/avatar";

const CARDS_COUNT = 5;
const ADDITIONAL_CARDS_COUNT = 2;

const renderFilmCards = (filmElement, films, comments, onDataChange, onViewChange) => {
  return films.map((film) => {
    const cardPresenter = new CardPresenter(filmElement, comments, onDataChange, onViewChange);
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

  constructor(container, models) {
    this._container = container.getElement();
    this._filmsCardsModel = models.filmsCardsModel;
    this._commentsModel = models.commentsModel;

    this._showedFilmCards = [];
    this._displayingCardsCount = CARDS_COUNT;
    this._noFilmCards = new NoFilmCardsView();
    this._loadMoreButton = new LoadMoreButtonView();
    this._sortComponent = new SortView();
    this._avatarComponent = new UserAvatar(this._filmsCardsModel.getFilmsAll());

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._sortComponent.changeSortTypeHandler(this._onSortTypeChange);
    this._filmsCardsModel.setFilterChangeHandler(this._onFilterChange);

    this._filmsListElement = this._container.querySelector(`.films-list`);
    this._filmsListContainer = this._filmsListElement.querySelector(`.films-list__container`);
    this._header = document.querySelector(`.profile`);

    this._films = this._filmsCardsModel.getFilms();
  }

  render() {
    if (this._filmsCardsModel.length === 0) {
      render(this._filmsListElement, new this._noFilmCards(), RenderPosition.BEFOREEND);
      return;
    }

    render(this._header, this._avatarComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sortComponent, RenderPosition.AFTERBEGIN);

    this._renderFilmsCards(this._films.slice(0, this._displayingCardsCount));
    this._renderExtraFilms();
    this._renderLoadMoreButton();
  }


  _renderExtraFilms() {
    const additionalFilmsElement = this._container.querySelectorAll(`.films-list--extra .films-list__container`);

    const topRatedFilms = this._films.slice(0).sort((a, b) => b.rating - a.rating).slice(0, ADDITIONAL_CARDS_COUNT);
    const mostCommentedFilms = this._films.slice(0).sort((a, b) => b.commentsCount - a.commentsCount).slice(0, ADDITIONAL_CARDS_COUNT);

    const topRatedFilmCards = renderFilmCards(additionalFilmsElement[0], topRatedFilms, this._commentsModel, this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(topRatedFilmCards);

    const mostCommentedFilmCards = renderFilmCards(additionalFilmsElement[1], mostCommentedFilms, this._commentsModel, this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(mostCommentedFilmCards);

  }

  _renderFilmsCards(films) {
    const newFilmCards = renderFilmCards(this._filmsListContainer, films, this._commentsModel, this._onDataChange, this._onViewChange);
    this._showedFilmCards = this._showedFilmCards.concat(newFilmCards);
  }

  _renderFilterFilms(films) {
    this._renderFilmsCards(films);
    this._displayingCardsCount = this._showedFilmCards.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButton);
    if (this._displayingCardsCount >= this._films.length) {
      return;
    }

    render(this._filmsListElement, this._loadMoreButton, RenderPosition.BEFOREEND);
    // показ карточек фильма по нажатию на кнопку показать больше
    this._loadMoreButton.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onSortTypeChange(sort) {
    this._displayingCardsCount = CARDS_COUNT;
    const sortedFilms = getSortedFilmCards(this._films, sort, 0, this._displayingCardsCount);

    this._removeFilmCards();
    this._renderFilmsCards(sortedFilms);
    this._renderExtraFilms(this._filmsCardsModel.getFilmsAll());
  }

  _onDataChange(filmCardPresenter, oldData, newData) {
    const isSuccess = this._filmsCardsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      if (document.querySelector(`body`).contains(document.querySelector(`.film-details`))) {
        filmCardPresenter.render(newData);
        this._updateFilms(this._displayingCardsCount);
      } else {
        this._updateFilms(this._displayingCardsCount);
      }
      remove(this._avatarComponent);
      this._avatarComponent = new UserAvatar(this._filmsCardsModel.getFilmsAll());
      render(this._header, this._avatarComponent, RenderPosition.BEFOREEND);
    }
  }

  _onViewChange() {
    this._showedFilmCards.forEach((film) => film.setDefaultView());
  }

  _removeFilmCards() {
    this._showedFilmCards.forEach((presenter) => presenter.destroy());
    this._showedFilmCards = [];
  }

  _onFilterChange() {
    this._removeFilmCards();
    const sortedFilms = getSortedFilmCards(this._films, this._sortComponent.getSortType(), 0, CARDS_COUNT);
    this._renderFilterFilms(sortedFilms);
    this._renderExtraFilms(this._filmsCardsModel.getFilmsAll());
    this._renderLoadMoreButton();
  }

  _updateFilms(count) {
    this._removeFilmCards();
    const sortedFilms = getSortedFilmCards(this._films, this._sortComponent.getSortType(), 0, count);
    this._renderFilmsCards(sortedFilms);
    this._renderExtraFilms(this._filmsCardsModel.getFilmsAll());
    this._renderLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    const prevCards = this._displayingCardsCount;
    this._displayingCardsCount = this._displayingCardsCount + CARDS_COUNT;

    const sortedFilms = getSortedFilmCards(this._films, this._sortComponent.getSortType(), prevCards, this._displayingCardsCount);
    this._renderFilmsCards(sortedFilms);

    if (this._displayingCardsCount >= this._films.length) {
      remove(this._loadMoreButton);
    }
  }

}
