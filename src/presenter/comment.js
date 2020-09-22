import {render} from "../utils/render";
import Comment from "../view/comment";

export default class CommentPresenter {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
  }

  render(comment) {
    this._commentComponent = new Comment(comment);
    this._commentComponent.setDeleteButtonClickHandler(()=> this._onDataChange(comment, null));

    const containerElement = this._container.getCommentsListElement();
    render(containerElement, this._commentComponent);
  }
}
