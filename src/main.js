import BoardPresenter from "./presenter/board";
import FilterPresenter from "./presenter/filter";
import Board from "./view/board";
import Statistics from "./view/statistics";
import Navigation from "./view/navigation";
import Footer from "./view/footer";
import CommentsModel from "./models/comments";
import FilmCardModel from "./models/cards";
import {NavigationItem} from "./const";
import {generateFilmCards} from "./mock/film-card";
import {render} from "./utils/render";

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
const navigation = new Navigation();
render(siteMainElement, navigation);

// main - filter
const filterPresenter = new FilterPresenter(navigation, filmsCardsModel);
filterPresenter.render();

// main - films-list
const board = new Board(films);
const boardPresenter = new BoardPresenter(board, models);

render(siteMainElement, board);
boardPresenter.render(films);

// footer
const footer = document.querySelector(`.footer__statistics`);
render(footer, new Footer(films.length));

// statistics
const statistics = new Statistics(filmsCardsModel);
render(siteMainElement, statistics);
statistics.hide();

navigation.setClickHandler((item) => {
  if (item === NavigationItem.FILTER) {
    boardPresenter.show();
    boardPresenter.resetSortType();
    statistics.hide();
  } else {
    boardPresenter.hide();
    statistics.show();
  }
});
