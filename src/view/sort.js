import Abstract from "./abstract";
import {sortType} from "../const";

const createSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${sortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${sortType.DATE_UP}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${sortType.RATING_DOWN}">Sort by rating</a></li>
  </ul>`;

export default class Sort extends Abstract {
  constructor() {
    super();
    this._currentSortType = sortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  changeSortTypeHandler(handler) {
    const sortComponent = this.getElement();
    sortComponent.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sort = evt.target.dataset.sortType;

      if (this._currentSortType === sort) {
        return;
      }

      handler(this._currentSortType);

      sortComponent.querySelectorAll(`.sort_buttons`).forEach((button) => {
        if (button.classList.contains(`sort__button--active`)) {
          button.classList.remove(`sort__button--active`);
        }
      });
      sortComponent.querySelector(`[data-sort-type=${this._currentSortType}]`).classList.add(`sort__button--active`);
    });
  }
}
