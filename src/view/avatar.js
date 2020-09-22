import Abstract from "./abstract";
import {getHistoryFilms} from "../utils/filter";

const getUsername = (films) => {
  const count = getHistoryFilms(films).length;
  switch (true) {
    case count >= 1 && count <= 10:
      return `Novice`;
    case count >= 11 && count <= 20:
      return `Fan`;
    case count > 21:
      return `Movie Buff`;
  }
  return ``;
};

const createUserAvatarTemplate = (films) => {
  return (
    `<p class="profile__rating">${getUsername(films)}</p>`
  );
};

export default class UserAvatar extends Abstract {
  constructor(films) {
    super();

    this._films = films;
  }

  getTemplate() {
    return createUserAvatarTemplate(this._films);
  }

}
