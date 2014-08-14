var Game = require('./lib/game')
  , Player = require('./lib/player')

var team1 = [
      new Player(), new Player(), new Player()
    ]
  , team2 = [
      new Player(), new Player(), new Player()
    ]

var g = new Game(team1, team2)

g.playTurn()


process.on('SIGINT', function () {
  console.log(JSON.stringify(g.team1, true, 2))
  console.log(JSON.stringify(g.team2, true, 2))
  process.exit()
})
