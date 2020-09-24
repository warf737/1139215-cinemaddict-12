import Abstract from "./abstract";

const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class MostCommented extends Abstract {
  constructor() {
    super();
  }

  getTemplate() {
    return createMostCommentedTemplate();
  }
}
