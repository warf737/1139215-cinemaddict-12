import BoardPresenter from "./presenter/board";
import UserAvatarView from "./view/avatar";
import FilterPresenter from "./presenter/filter";
import FilmsList from "./view/films-list";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";
import FilmCardModel from "./models/card";

const FILMS_COUNT = 22;
const films = generateFilmCards(FILMS_COUNT);

const filmsCardsModel = new FilmCardModel();
filmsCardsModel.setFilms(films);

// header
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserAvatarView(), RenderPosition.BEFOREEND);

// main
const siteMainElement = document.querySelector(`.main`);
// main - navigation
const filterPresenter = new FilterPresenter(siteMainElement, filmsCardsModel);
filterPresenter.render();

// main - films-list
const filmsList = new FilmsList();
render(siteMainElement, filmsList, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(filmsList, filmsCardsModel);
boardPresenter.render(films);
