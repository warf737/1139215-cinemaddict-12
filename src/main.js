import BoardPresenter from "./presenter/board";
import FilterPresenter from "./presenter/filter";
import Board from "./view/board";
import {generateFilmCards} from "./mock/film-card";
import {render, RenderPosition} from "./utils/render";
import FilmCardModel from "./models/filter";
import Footer from "./view/footer";
import CommentsModel from "./models/comments";

const siteMainElement = document.querySelector(`.main`);

const FILMS_COUNT = 22;
const films = generateFilmCards(FILMS_COUNT);

// films
const filmsCardsModel = new FilmCardModel();
filmsCardsModel.setFilms(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(films);
const models = {filmsCardsModel, commentsModel};

// main - navigation
const filterPresenter = new FilterPresenter(siteMainElement, filmsCardsModel);
filterPresenter.render();

// main - films-list
const filmsList = new Board(films);
render(siteMainElement, filmsList, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(filmsList, models);
boardPresenter.render(films);

const footer = document.querySelector(`.footer__statistics`);
render(footer, new Footer(films.length), RenderPosition.BEFOREEND);
