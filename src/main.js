import Api from "./api";
import BoardPresenter from "./presenter/board";
import FilterPresenter from "./presenter/filter";
import Board from "./view/board";
import Statistics from "./view/statistics";
import Navigation from "./view/navigation";
import Footer from "./view/footer";
import Loading from "./view/loading";
import CommentsModel from "./models/comments";
import FilmCardModel from "./models/cards";
import {NavigationItem} from "./const";
import {render, remove} from "./utils/render";

const siteMainElement = document.querySelector(`.main`);
const AUTHORIZATION = `Basic TVEGx1PuH0yssK3=`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const api = new Api(END_POINT, AUTHORIZATION);

const filmsCardsModel = new FilmCardModel();
const commentsModel = new CommentsModel();
const navigation = new Navigation();
const filterPresenter = new FilterPresenter(navigation, filmsCardsModel);
const board = new Board();
const models = {filmsCardsModel, commentsModel};
const boardPresenter = new BoardPresenter(board, models, api);
const loading = new Loading();

render(siteMainElement, navigation);
filterPresenter.render();
render(siteMainElement, loading);

const footer = document.querySelector(`.footer__statistics`);

api.getFilms()
  .then((films) => {
    filmsCardsModel.setFilms(films);
    render(footer, new Footer(films.length));
    return Promise.all(filmsCardsModel.getFilmsAll().map((film) => api.getComments(film)));
  })
  .then((comments) => {
    commentsModel.setComments(comments);
  })
  .catch(() => {
    filmsCardsModel.setFilms([]);
  })
  .finally(() => {
    boardPresenter.render();
    remove(loading);
    render(siteMainElement, board);
    boardPresenter.render();
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
  });

