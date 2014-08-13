var Card = require('./card')

var CARDS_PER_SUITE = 6
  , NUM_SUITES = 9
  , SUITES = [
        'crabs'
      , 'goldfish'
      , 'jellyfish'
      , 'narwhal'
      , 'octopus'
      , 'seahorse'
      , 'starfish'
      , 'turtle'
      , 'whale'
    ]

module.exports = Deck

function Deck(numSuites, cardsPerSuite) {
  numSuites = numSuites || NUM_SUITES
  cardsPerSuite = cardsPerSuite || CARDS_PER_SUITE
  this.cards = generateCards(numSuites, cardsPerSuite)
}

Deck.prototype.shuffle = function () {
  this.cards.sort(function () {
    return (Math.random() > 0.5) ? -1 : 1
  })
  return this
}

Deck.prototype.next = function () {
  return this.cards.shift()
}

function generateCards(numSuites, cardsPerSuite) {
  var s = 0, n = 1, cards = []
  for (s = 0; s < numSuites; ++s) {
    for (n = 1; n <= cardsPerSuite; ++n) {
      cards.push(new Card(SUITES[s], n))
    }
  }
  return cards
}
