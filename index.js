var Game = require('./lib/game')
  , Player = require('./lib/player')

var team1 = [
      new Player(), new Player(), new Player()
    ]
  , team2 = [
      new Player(), new Player(), new Player()
    ]

var g = new Game(team1, team2)
