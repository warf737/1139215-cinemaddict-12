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

// main
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNavigationView(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// main - films
// const filmsMainElement = document.querySelector(`.films`);
render(siteMainElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);


// main - films - films-elements - film
const filmsListElement = siteMainElement.querySelector(`.films .films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
let displayingCardsCount = CARDS_COUNT;
films.slice(0, displayingCardsCount).forEach((film) => render(
    filmsListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND)
);

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


// footer
const footerElement = document.querySelector(`.footer`);
render(footerElement, new DetailPopupView(films[getRandomInteger(0, films.length - 1)]).getElement(), RenderPosition.AFTERBEGIN);
