var Card = require('./card')
  , Deck = require('./deck')
  , random = require('./random')

module.exports = Player

function Player() {
  this.cards = []
}

Player.prototype.addCard = function (card) {
  this.cards.push(card)
}

Player.prototype.hasCard = function (card) {
  return findCard(this.cards, card) > -1
}

Player.prototype.hasCardOfSameSuite = function (card) {
  return findCardOfSameSuite(this.cards, card) > -1
}

Player.prototype.removeCard = function (card) {
  var index = findCard(this.cards, card)
  if (index > -1) {
    this.cards.splice(index, 1)
  } else {
    throw new Error('card not found')
  }
}

Player.prototype.playTurn = function (state) {
  return {
      player: random(state.opponents)
    , card: getRandomLegalMove(this.cards)
  }
}

function findCard(cards, card) {
  var c = 0, n = cards.length
  for (; c < n; ++c) {
    if (cards[c].equals(card))
      return c
  }
  return -1
}

function findCardOfSameSuite(cards, card) {
  var c = 0, n = cards.length
  for (; c < n; ++c) {
    if (cards[c].suite === card.suite)
      return c
  }
  return -1
}

function getRandomLegalMove(cards) {
  var d = new Deck().shuffle()
    , found = false
  while (!found) {
    card = d.next()
    // not in my hand?
    if (findCard(cards, card) < 0) {
      if (findCardOfSameSuite(cards, card) > -1) {
        found = true
      }
    }
  }
  return card
}
