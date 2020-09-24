import {render} from "../utils/render.js";
import CommentsComponent from "../view/comments-list";
import CommentController from "../presenter/comment";
import CommentModel from "../models/comment";
import FilmCardModel from "../models/card";
import {ANIMATION_TIMEOUT} from "../const";

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
        if (this._commentsComponent.getCommentTextElement().classList.contains(`error`)) {
          this._commentsComponent.getCommentTextElement().classList.remove(`error`);
        }
        const commentModel = parseFormData(this._container.getData());
        this._commentsComponent.getCommentTextElement().classList.remove(`disabled`, `true`);
        this._onCommentDataChange(this, null, commentModel);
      }
    });
    render(this._container.getCommentsElement(), this._commentsComponent);
    this._renderComments();
  }

  shake() {
    this._commentsComponent.getNewCommentElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._commentsComponent.getCommentTextElement().classList.add(`error`);
    this._commentsComponent.getCommentTextElement().removeAttribute(`disabled`);
    setTimeout(() => {
      this._commentsComponent.getNewCommentElement().style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  _renderComments() {
    const film = this._container.film;
    this._commentsModel.getComments(film).forEach((comment) => {
      new CommentController(this._commentsComponent, this._onCommentDataChange).render(comment);
    });
  }

  _onCommentDataChange(controller, oldData, newData) {
    const film = this._container.film;
    const newCard = FilmCardModel.clone(film);
    if (newData === null) {
      this._api.deleteComment(oldData.id)
        .then(() => {
          if (this._commentsModel.removeComment(oldData.is)) {
            newCard.removeComment(oldData.is);
            this._onDataChange(film, newCard);
          }
        })
        .catch(() => {
          controller.shake();
        });
    } else if (oldData === null) {
      this._api.createComment(newData, film.id)
        .then((res) => {
          this._commentsModel.updateComments(res.models, film.id);
          newCard.comments = res.ids;
          this._onDataChange(film, newCard);
        })
        .catch(() => {
          controller.shake();
        });
    }
  }
}
