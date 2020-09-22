import MainNavigation from "../view/filter";
import {FilterType} from "../const";
import {render, replace} from "../utils/render";
import {getFilmsByFilter} from "../utils/filter.js";

export default class FilterPresenter {
  constructor(container, filmsCardsModel) {
    this._container = container;
    this._filmsCardsModel = filmsCardsModel;

    this._activeFilterType = FilterType.ALL;
    this._filterView = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsCardsModel.setHandlerDataChange(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allFilms = this._filmsCardsModel.getFilmsAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getFilmsByFilter(allFilms, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });
    const oldNavigation = this._filterView;

    this._filterView = new MainNavigation(filters);
    this._filterView.setFilterChangeHandler(this._onFilterChange);

    if (oldNavigation) {
      replace(this._filterView, oldNavigation);
    } else {
      render(container, this._filterView);
    }
  }

  _onFilterChange(filterType) {
    this._filmsCardsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
