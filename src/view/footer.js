import AbstractComponent from "./abstract.js";

const createFooterTemplate = (count) => {
  return (
    `<p>${count} movies inside</p>`
  );
};

export default class Footer extends AbstractComponent {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createFooterTemplate(this._count);
  }
}
