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

      const type = evt.target.dataset.sortType;

      sortComponent.querySelectorAll(`.sort__button`).forEach((element) => {
        if (element.classList.contains(`sort__button--active`) && this._currentSortType !== type) {
          element.classList.remove(`sort__button--active`);
        }
      });

      if (this._currentSortType === type) {
        return;
      }

      this._currentSortType = type;

      handler(this._currentSortType);
      sortComponent.querySelector(`[data-sort-type=${type}]`).classList.add(`sort__button--active`);

    });
  }
}
