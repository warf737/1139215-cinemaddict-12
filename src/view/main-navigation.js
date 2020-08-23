import {filterNames, cardfilters} from "../const";

const getNameFilter = (array, name) => {
  console.log(array, name);
  return array.filter((element) => {
    return element[name] === `true`;
  });
};

const createFilterMarkup = (filters, films) => {
  return filters
    .map((name, index) => {
      return (
        `<a href="#${name}" class="main-navigation__item">${name}
         <span class="main-navigation__item-count">${getNameFilter(films, cardfilters[index]).length}</span>
         </a>`
      );
    })
    .join(`\n`);
};

export const createMainNavigationTemplate = (films) => {
  const filtersMarkup = createFilterMarkup(filterNames, films);
  return (`<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};
