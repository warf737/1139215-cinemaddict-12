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


const SortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  RATING_DOWN: `rating-down`,
};

const NavigationItem = {
  FILTER: `filter`,
  STATISTIC: `statistic`,
};

const StatisticFilterType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const StatisticFilterTypes = Object.values(StatisticFilterType);

const ANIMATION_TIMEOUT = 600;

export {FilterType, emojies, SortType, NavigationItem, StatisticFilterType, StatisticFilterTypes, ANIMATION_TIMEOUT};
