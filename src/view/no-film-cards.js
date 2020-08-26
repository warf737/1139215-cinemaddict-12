import Abstract from "./abstract";

const createNoFilmCardsTemplate = () => {
  return (
    `<h2 class="films-list__title">There are no movies in our database</h2>`
  );
};


export default class NoFilmCards extends Abstract {

  getTemplate() {
    return createNoFilmCardsTemplate();
  }

}
