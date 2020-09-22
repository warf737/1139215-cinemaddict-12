import Abstract from "./abstract";
import {FilterType} from "../const";

const FILTER_ID_PREFIX = `#`;

const getFilterNameById = (link) => {
  return link.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  return (
    `<a href="#${name}" class="main-navigation__item
          ${name === FilterType.ALL ? `main-navigation__item--active` : ``}">
          ${name} ${name === FilterType.ALL ? `movies` :
      `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  );
};

export const createMainNavigationTemplate = (filters) => {
  const filtersMarkup = filters.map((item) => createFilterMarkup(item)).join(`\n`);
  return (`<nav class="main-navigation">
      <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters);
  }


  setFilterChangeHandler(handler) {
    this.getElement().querySelectorAll(`.main-navigation__item`)
      .forEach((element) => {
        element.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          const filterName = getFilterNameById(element.getAttribute(`href`));
          this.getElement().querySelector(`main-navigation__item--active`).classList.remove(`main-navigation__item--active`);
          evt.target.classList.add(`main-navigation__item--active`);
          handler(filterName);
        });
      });
  }
}
