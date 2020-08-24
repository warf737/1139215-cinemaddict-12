import UserAvatarView from "./view/avatar";
import MainNavigationView from "./view/main-navigation";
import SortView from "./view/sort";
import FilmsListView from "./view/films-list";
import FilmCardView from "./view/card";
import DetailPopupView from "./view/popup";
import LoadMoreButtonView from "./view/load-more-button";
import {generateFilmCards} from "./mock/film-card";
import {getRandomInteger, render, RenderPosition} from "./utils";

const FILMS_COUNT = 17;
const CARDS_COUNT = 5;
const ADDITIONAL_CARDS_COUNT = 2;
const films = generateFilmCards(FILMS_COUNT);

// header
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserAvatarView().getElement(), RenderPosition.BEFOREEND);

// main - navigation, main - sort
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNavigationView(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);

const renderFilmCard = (filmListElement, film) => {
  const siteBody = document.querySelector(`body`);
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      siteBody.removeChild(DetailPopupComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onHandlerClick = (elem) => {
    elem.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      siteBody.appendChild(DetailPopupComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  };

  const filmCardComponent = new FilmCardView(film);
  const DetailPopupComponent = new DetailPopupView(film);

  render(filmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);

  const poster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const name = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const comment = filmCardComponent.getElement().querySelector(`.film-card__ comments`);

  onHandlerClick(poster);
  onHandlerClick(name);
  onHandlerClick(comment);

  const popupClose = DetailPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  popupClose.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    siteBody.removeChild(DetailPopupComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const renderFilmsListComponent = () => {

  const filmsListElement = siteMainElement.querySelector(`.films-list`);
  // main - films - films-elements - film
  const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

  let displayingCardsCount = CARDS_COUNT;
  films.slice(0, displayingCardsCount)
    .forEach((film) => {
      renderFilmCard(filmsListContainerElement, film);
    });

  // button 'show more'
  render(filmsListElement, new LoadMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  // показ карточек фильма по нажатию на кнопку показать больше
  const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevCards = displayingCardsCount;
    displayingCardsCount = displayingCardsCount + CARDS_COUNT;

    films.slice(prevCards, displayingCardsCount)
      .forEach((film) => render(filmsListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    if (displayingCardsCount >= films.length) {
      loadMoreButton.remove();
    }
  });

  // extra films
  const additionalFilmsElement = siteMainElement.querySelectorAll(`.films-list--extra`);

  additionalFilmsElement.forEach((element) => {
    let elementContainer = element.querySelector(`.films-list__container`);
    for (let i = 0; i < ADDITIONAL_CARDS_COUNT; i++) {
      render(elementContainer, new FilmCardView(films[getRandomInteger(0, films.length - 1)]).getElement(), RenderPosition.BEFOREEND);
    }
  });
};

renderFilmsListComponent(films);
// footer
// const footerElement = document.querySelector(`.footer`);
// render(footerElement, new DetailPopupView(films[getRandomInteger(0, films.length - 1)]).getElement(), RenderPosition.AFTERBEGIN);
