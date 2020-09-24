export default class Comment {
  constructor(data, filmId) {
    this.filmId = filmId;
    this.id = data[`id`];
    this.author = data[`author`];
    this.text = data[`comment`];
    this.day = data[`date`];
    this.emoji = data[`emoji`];
  }

  toRAW() {
    return {
      comment: this.text,
      date: this.day.toISOString(),
      emotion: this.emoji
    };
  }

  static parseComment(data, filmId) {
    return new Comment(data, filmId);
  }

  static parseComments(data, filmId) {
    return data.map((rawComment) => {
      return Comment.parseComment(rawComment, filmId);
    });
  }
}
