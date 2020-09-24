import {render} from "../utils/render.js";
import CommentsComponent from "../view/comments-list";
import CommentController from "../presenter/comment";
import CommentModel from "../models/comment";
import FilmCardModel from "../models/card";

const parseFormData = (formData) => {
  return new CommentModel({
    "id": null,
    "author": null,
    "comment": formData.get(`comment`),
    "emotion": formData.get(`comment--emoji`),
    "date": new Date().toISOString(),
  }, null);
};

export default class CommentsController {
  constructor(container, api, commentsModel, onDataChange) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._onDataChange = onDataChange;
    this._api = api;

    this._commentsComponent = null;

    this._onCommentDataChange = this._onCommentDataChange.bind(this);
  }

  render() {
    this._commentsComponent = new CommentsComponent(this._container.film);

    this._commentsComponent.setButtonKeydownHandler((evt) => {
      if ((evt.key === `Enter`) && (evt.ctrlKey || evt.metaKey)) {
        const commentModel = parseFormData(this._container.getData());
        this._onCommentDataChange(null, commentModel);
      }
    });
    render(this._container.getCommentsElement(), this._commentsComponent);
    this._renderComments();
  }

  _renderComments() {
    const film = this._container.film;
    this._commentsModel.getComments(film).forEach((comment) => {
      new CommentController(this._commentsComponent, this._onCommentDataChange).render(comment);
    });
  }

  _onCommentDataChange({id: oldId}, newData) {
    const film = this._container.film;
    const newCard = FilmCardModel.clone(film);
    if (newData === null) {
      this._api.deleteComment(oldId)
        .then(() => {
          if (this._commentsModel.removeComment(oldId)) {
            newCard.removeComment(oldId);
            this._onDataChange(film, newCard);
          }
        });
    } else if (!oldId) {
      this._api.createComment(newData, film.id)
        .then((res) => {
          this._commentsModel.updateComments(res.models, film.id);
          newCard.comments = res.ids;
          this._onDataChange(film, newCard);
        });
    }

    this._onDataChange(film, Object.assign({}, film, {commentsCount: this._commentsModel.getComments(film).length}));
  }
}
