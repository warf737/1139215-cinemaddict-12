import Abstract from "./abstract";

const createFilmsListTemplate = (films) =>
  `<section class="films">
    <section class="films-list">
      ${films.length === 0 ? `` : `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`}
      <div class="films-list__container">
      </div>
    </section>
    <section class="films-list--extra">
      ${films.length === 0 ? `` : `<h2 class="films-list__title">Top rated</h2>`}
      <div class="films-list__container">
      </div>
    </section>
    <section class="films-list--extra">
      ${films.length === 0 ? `` : `<h2 class="films-list__title">Most commented</h2>`}
      <div class="films-list__container">
      </div>
    </section>
  </section>`;

export default class Board extends Abstract {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createFilmsListTemplate(this._films);
  }

}
