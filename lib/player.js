var Card = require('./card')

module.exports = Player

function Player() {
  this.cards = []
}

Player.prototype.addCard = function (card) {
  this.cards.push(card)
}

Player.prototype.hasCard = function (card) {
  return findCard(this.cards, card) !== -1
}

Player.prototype.removeCard = function (card) {
  var index = findCard(this.cards, card)
  if (index > -1) {
    this.cards.splice(index, 1)
  } else {
    throw new Error('card not found')
  }
}

function findCard(cards, card) {
  var c = 0, n = cards.length
  for (; c < n; ++c) {
    if (cards[c].equals(card.suite))
      return c
  }
  return -1
}
