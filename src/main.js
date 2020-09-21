import BoardPresenter from "./presenter/board";
import UserAvatarView from "./view/avatar";
import MainNavigationView from "./view/main-navigation";
import FilmsList from "./view/films-list";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";
import FilmCardModel from "./models/card";

const FILMS_COUNT = 22;
const films = generateFilmCards(FILMS_COUNT);

const filmCardModel = new FilmCardModel();
filmCardModel.setFilms(films);

// header
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserAvatarView(), RenderPosition.BEFOREEND);

// main
const siteMainElement = document.querySelector(`.main`);
// main - navigation
render(siteMainElement, new MainNavigationView(films), RenderPosition.BEFOREEND);
// main - films-list
const filmsList = new FilmsList();
render(siteMainElement, filmsList, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(filmsList, filmCardModel);
boardPresenter.render(films);
