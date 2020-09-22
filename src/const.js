const FilterType = {
  ALL: `All`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`
};

const EmojiName = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const emojies = Object.values(EmojiName);


const sortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  RATING_DOWN: `rating-down`,
};
export {FilterType, emojies, sortType};
