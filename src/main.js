import BoardPresenter from "./presenter/board";
import FilterPresenter from "./presenter/filter";
import Board from "./view/board";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";
import FilmCardModel from "./models/filter";
import Footer from "./view/footer";

const FILMS_COUNT = 22;
const films = generateFilmCards(FILMS_COUNT);

const filmsCardsModel = new FilmCardModel();
filmsCardsModel.setFilms(films);

// main
const siteMainElement = document.querySelector(`.main`);
// main - navigation
const filterPresenter = new FilterPresenter(siteMainElement, filmsCardsModel);
filterPresenter.render();

// main - films-list
const filmsList = new Board(films);
render(siteMainElement, filmsList, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(filmsList, filmsCardsModel);
boardPresenter.render(films);

const footer = document.querySelector(`.footer__statistics`);
render(footer, new Footer(films.length), RenderPosition.BEFOREEND);
