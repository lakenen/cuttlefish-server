module.exports = Card

function Card(suite, number) {
  this.suite = suite
  this.number = number
}

Card.prototype.equals = function (card) {
  return this.suite === card.suite
      && this.number === card.number
}

Card.prototype.toString = function () {
  return this.number + ' of ' + this.suite
}
