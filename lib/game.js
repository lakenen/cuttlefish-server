var Deck = require('./deck')

module.exports = Game

function Game(team1, team2, deck) {
  this.team1 = team1
  this.team2 = team2
  this.players = this.team1.concat(this.team2)
  this.numPlayers = this.players.length
  this.currentPlayer = random(this.players)

  this.deck = deck || new Deck().shuffle()
  this.deal()
}

Game.prototype.deal = function () {
  // assume deck is shuffled
  var p = 0
    , card

  while ((card = this.deck.next())) {
    this.players[p].addCard(card)
    p = (p + 1) % this.numPlayers
  }
}

Game.prototype.playTurn = function () {
  this.currentPlayer.play({

  })
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
