var Deck = require('./deck')
  , random = require('./random')

module.exports = Game

function Game(team1, team2, deck) {
  this.team1 = team1
  this.team1.forEach(setTeam(1))
  this.team2 = team2
  this.team2.forEach(setTeam(2))

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
  var player = this.currentPlayer
  console.log('PLAYER', player.name + '\'s turn')
  var opponents = player.team === 1 ? this.team2 : this.team1
  var move = player.playTurn({
    opponents: opponents.map(function (p) { return p.id })
  })

  var opponent = opponents[move.player]
  console.log('PLAYER', player.name, 'asked for', move.card.toString(), 'from', opponent.name)

  if (!isValidMove(player, move)) {
    throw new Error('invalid move')
  }

  var hasCard = opponent.hasCard(move.card)
  if (hasCard) {
    opponent.removeCard(move.card)
    player.addCard(move.card)
    console.log('PLAYER', opponent.name, 'had', move.card.toString())
  } else {
    console.log('PLAYER', opponent.name, 'did not have', move.card.toString())
    this.currentPlayer = opponent
  }

  if (this.currentPlayer.cards.length === 0) {
    console.log('PLAYER', this.currentPlayer.name, 'is out of cards')
    this.players.splice(this.players.indexOf(this.currentPlayer), 1)

    if (this.players.length > 1) {
      this.currentPlayer = random(this.players)
    } else {
      console.log('GAME OVER!')
    }
  }
  setTimeout(this.playTurn.bind(this))
}

function isValidMove(player, move) {
  if (move.player.team === player.team) {
    return false
  }

  if (player.hasCard(move.card)) {
    return false
  }

  if (!player.hasCardOfSameSuite(move.card)) {
    return false
  }

  return true
}

function setTeam(num) {
  return function (p, i) {
    p.team = num
    p.name = 'team-' + num + '-' + i
    p.id = i
  }
}
