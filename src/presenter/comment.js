import {render} from "../utils/render";
import Comment from "../view/comment";
import {ANIMATION_TIMEOUT} from "../const";

export default class CommentPresenter {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(comment) {
    this._commentComponent = new Comment(comment);
    this._commentComponent.setDeleteButtonClickHandler(()=> {
      this._commentComponent.setData({
        deleteButtonText: `Deleting...`,
      });
      this._commentComponent.getDeleteButton().setAttribute(`disabled`, true);
      this._onDataChange(comment, null);
    });

    const containerElement = this._container.getCommentsListElement();
    render(containerElement, this._commentComponent);
  }

  snake() {
    this._commentComponent.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._commentComponent.getElement().style.animation = ``;

      this._commentComponent.getDeleteButton().removeAttribute(`disabled`);
      this._commentComponent.setData({
        deleteButtonText: `Delete`
      });
    }, ANIMATION_TIMEOUT);
  }
}
