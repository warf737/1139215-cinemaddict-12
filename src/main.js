import {createUserAvatarTemplate} from "./view/avatar";
import {createMainNavigationTemplate} from "./view/main-navigation";
import {createSortTemplate} from "./view/sort";
import {createFilmsListMostCommentedTemplate} from "./view/most-commented-films-list";
import {createFilmsListTemplate} from "./view/films-list";
import {createFilmsListTopRatedTemplate} from "./view/top-rated-films-list";
import {createFilmsTemplate} from "./view/films";
import {createCardTemplate} from "./view/card";
import {createPopUptemplate} from "./view/popup";
import {createShowMoreButton} from "./view/load-more-button";
import {generateFilmCards} from "./mock/film-card";
import {getRandomInteger} from "./utils";

const FILMS_COUNT = 17;
const CARDS_COUNT = 5;
const ADDITIONAL_CARDS_COUNT = 2;
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const films = generateFilmCards(FILMS_COUNT);

// header
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserAvatarTemplate(), `beforeend`);

// main
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainNavigationTemplate(films), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
// render(siteMainElement, createFilmsTemplate(), `beforeend`);

// main - films
// const filmsMainElement = document.querySelector(`.films`);
render(siteMainElement, createFilmsListTemplate(), `beforeend`);


// main - films - films-elements - film
const filmsListElement = siteMainElement.querySelector(`.films .films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
let displayingCardsCount = CARDS_COUNT;
films.slice(0, displayingCardsCount).forEach((film) => render(
    filmsListContainerElement, createCardTemplate(film), `beforeend`)
);

// button 'show more'
render(filmsListElement, createShowMoreButton(), `beforeend`);

// показ карточек фильма по нажатию на кнопку показать больше
const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevCards = displayingCardsCount;
  displayingCardsCount = displayingCardsCount + CARDS_COUNT;

  films.slice(prevCards, displayingCardsCount)
    .forEach((film) => render(filmsListContainerElement, createCardTemplate(film), `beforeend`));

  if (displayingCardsCount >= films.length) {
    loadMoreButton.remove();
  }
});

// top rated
render(filmsListElement, createFilmsListTopRatedTemplate(), `afterend`);

// most commented
render(filmsListElement, createFilmsListMostCommentedTemplate(), `afterend`);

// more films
const additionalFilmsElement = siteMainElement.querySelectorAll(`.films-list--extra`);

additionalFilmsElement.forEach((element) => {
  let elementContainer = element.querySelector(`.films-list__container`);
  for (let i = 0; i < ADDITIONAL_CARDS_COUNT; i++) {
    render(elementContainer, createCardTemplate(films[getRandomInteger(0, films.length - 1)]), `beforeend`);
  }
});


// footer
const footerElement = document.querySelector(`.footer`);
// render(footerElement, createPopUptemplate(films[getRandomInteger(0, films.length - 1)]), `afterend`);
