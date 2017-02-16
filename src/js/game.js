var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', {controller: 'GameController', templateURL: 'blackjack.html'})
  .when('/blackjack', {controller: 'GameController', templateURL: 'blackjack.html'});
  $routeProvider.otherwise({
    redirectTo : '/blackjack.html'
  });
});

app.controller('GameController', function ($scope, Game) {
  $scope.inPlay = false;
  $scope.game = Game;
  return true;
});

app.factory('Game', function () {
  // IMPORT
  var BlackJack = function(time) {
    this.time = time;
    this.bet = '';
    this.messages = ['How much time will you win? Only the cards know!', 'Enter your bet and hit play to start!'];
    this.showPlayButton = true;
    this.dealer = {
      hand : [
        { suit : 'unknown', value : 0 },
        { suit : 'unknown', value : 0 }
      ],
      total : 0
    };
    this.player = {
      hand : [
        { suit : 'unknown', value : 0 },
        { suit : 'unknown', value : 0 }
      ],
      total : 0
    };
    this.playerTurn = false;
    this.deck = {
      Spades : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
      Hearts : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
      Clubs : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
      Diamonds : ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    };
    this.cards = [
      '2S.svg', '3S.svg', '4S.svg', '5S.svg', '6S.svg', '7S.svg', '8S.svg', '9S.svg', '10S.svg', 'JS.svg', 'QS.svg', 'KS.svg', 'AS.svg',
      '2H.svg', '3H.svg', '4H.svg', '5H.svg', '6H.svg', '7H.svg', '8H.svg', '9H.svg', '10H.svg', 'JH.svg', 'QH.svg', 'KH.svg', 'AH.svg',
      '2C.svg', '3C.svg', '4C.svg', '5C.svg', '6C.svg', '7C.svg', '8C.svg', '9C.svg', '10C.svg', 'JC.svg', 'QC.svg', 'KC.svg', 'AC.svg',
      '2D.svg', '3D.svg', '4D.svg', '5D.svg', '6D.svg', '7D.svg', '8D.svg', '9D.svg', '10D.svg', 'JD.svg', 'QD.svg', 'KD.svg', 'AD.svg'
    ];
    this.playerHand = [];
    this.dealerHand = [];
  };

  BlackJack.prototype.reset = function() {
    this.dealer = {
      hand : [
        { suit : 'unknown', value : 0 },
        { suit : 'unknown', value : 0 }
      ],
      total : 0
    };
    this.player = {
      hand : [
        { suit : 'unknown', value : 0 },
        { suit : 'unknown', value : 0 }
      ],
      total : 0
    };
    this.deck = {
      Spades : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
      Hearts : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
      Clubs : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
      Diamonds : ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
    };
    this.playerHand = [];
    this.dealerHand = [];
    this.messages = ["Let's start that up again!"];
  };

  BlackJack.prototype.startGame = function() {
    this.over = false;
    this.deal();
  };

  BlackJack.prototype.makeBet = function() {
    this.messages.push('You currently have: ' + this.time + ' earned minutes' +
    '\n How much time will you bet?');
  };

  BlackJack.prototype.deal = function() {
    this.playerTurn = true;
    this.drawCard();
    this.drawCard();
    this.drawCard();
    this.drawCard();
    this.messages.push('The dealer is currently showing a: ' + this.dealer.hand[0].value + ' of ' + this.dealer.hand[0].suit);
    this.messages.push('Your starting hand: ' + this.player.hand[0].value + ' of ' + this.player.hand[0].suit + ' && ' +
    '\n' + this.player.hand[1].value + ' of ' + this.player.hand[1].suit);
    // Set point values of cards ------
    this.updateScore(this.dealer.hand, this.player.hand);

    if (this.player.total === 21) {
      this.end();
    }
    if (this.dealer.total === 21) {
      this.end();
    }
  };

  BlackJack.prototype.playerMove = function() {
      this.playerTurn = false;
      // Dealer must show hidden card && draw if total is under 17
      this.messages.push('The dealer flipped a ' + this.dealer.hand[1].value + ' of ' + this.dealer.hand[1].suit +
      '\n His hand is now: ' + this.dealer.hand[0].value + ' of ' + this.dealer.hand[0].suit + ' && ' +
      '\n' + this.dealer.hand[1].value + ' of ' + this.dealer.hand[1].suit);

      this.updateScore(this.dealer, this.player);
      if (this.dealer.total >= 17) {
        // He stays
        this.end();
      } else {
        // Dealer has to hit again
        this.hit();
      }
  };

  BlackJack.prototype.drawCard = function() {
    var suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
    var randomSuit = suits[Math.floor(Math.random() * suits.length)];
    var cardsInSuit = this.deck[randomSuit];
    var randomCard = Math.floor(Math.random() * cardsInSuit.length);
    if (this.deck[randomSuit][randomCard] !== '') {                             // Been drawn already?
      if (this.playerTurn === true) {                                           // Player's turn
        if (this.player.hand[0].suit === 'unknown') {                           // First card for player
          this.player.hand[0].suit = randomSuit;                                // adjust hand suit
          this.player.hand[0].value = this.deck[randomSuit][randomCard];        // adjust hand value
          this.playerHand.push(this.deck[randomSuit][randomCard] + randomSuit[0]);
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = false;                                              // change turn
        } else {
          this.player.hand[1].suit = randomSuit;                                // adjust hand suit
          this.player.hand[1].value = this.deck[randomSuit][randomCard];        // adjust hand value
          this.playerHand.push(this.deck[randomSuit][randomCard] + randomSuit[0]);
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = false;
        }
      } else {                                                                  // Dealer's turn
        if (this.dealer.hand[0].suit === 'unknown') {                           // First card for dealer
          this.dealer.hand[0].suit = randomSuit;                                // adjust hand suit
          this.dealer.hand[0].value = this.deck[randomSuit][randomCard];        // adjust hand value
          this.dealerHand.push(this.deck[randomSuit][randomCard] + randomSuit[0]);
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = true;                                               // change turn
        } else {
          this.dealer.hand[1].suit = randomSuit;                                // adjust hand suit
          this.dealer.hand[1].value = this.deck[randomSuit][randomCard];        // adjust hand value
          this.dealerHand.push(this.deck[randomSuit][randomCard] + randomSuit[0]);
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = true;
        }
      }
    } else {
      // Draw a different card
      this.drawCard();
    }
  };

  BlackJack.prototype.updateScore = function(dealer, player) {                       //  takes an array of card objects from both players
    this.dealer.total = 0;
    this.player.total = 0;
    for (var i = 0; i < this.dealer.hand.length; i++) {                           //  iterate over dealers hand
      if (this.dealer.hand[i].value === 'J' || this.dealer.hand[i].value === 'Q' || this.dealer.hand[i].value === 'K') {
        this.dealer.total += 10;
      } else if (this.dealer.hand[i].value === 'A') {
        this.dealer.total += 11;
        this.dealer.total > 21 ? this.dealer.total -= 10 : this.dealer.total; // breaking Ace-11 resets to value of 1
      } else {
        this.dealer.total += Number(this.dealer.hand[i].value);
      }
    }
    for (var j = 0; j < this.player.hand.length; j++) {                           //  iterate over players hand
      if (this.player.hand[j].value === 'J' || this.player.hand[j].value === 'Q' || this.player.hand[j].value === 'K') {
        this.player.total += 10;
      } else if (this.player.hand[j].value === 'A') {
        this.player.total += 11;
        this.player.total > 21 ? this.player.total -= 10 : this.player.total; // breaking Ace-11 resets to value of 1
      } else {
        this.player.total += Number(this.player.hand[j].value);
      }
    }
  };

  BlackJack.prototype.hit = function() {
    // Generate another random card ...
    var suits = ['Spades', 'Clubs', 'Hearts', 'Diamonds'];
    var randomSuit = suits[Math.floor(Math.random() * suits.length)];
    var cardsInSuit = this.deck[randomSuit];
    var randomCard = Math.floor(Math.random() * cardsInSuit.length);

    if (this.deck[randomSuit][randomCard] !== '') {                             // Been drawn already?
      if (this.playerTurn === true) {
        this.player.hand.push({
          suit : randomSuit,
          value : this.deck[randomSuit][randomCard]
        });
        this.playerHand.push(this.deck[randomSuit][randomCard] + randomSuit[0]);
        this.updateScore();
        this.messages.push('You just drew: ' + this.deck[randomSuit][randomCard] + ' of ' + randomSuit +
        '\n your total is now at: ' + this.player.total);
        if (this.player.total > 21) {
          this.playerTurn = false;
          this.bust();
        }
      } else {                                                                  // Dealer's turn
        this.dealer.hand.push({
          suit : randomSuit,
          value : this.deck[randomSuit][randomCard]
        });
        this.dealerHand.push(this.deck[randomSuit][randomCard] + randomSuit[0]);
        this.updateScore();

        // Inform player what the Dealer drew ------
        this.messages.push('The dealer just drew: ' + this.deck[randomSuit][randomCard] + ' of ' + randomSuit +
        '\n his total is now at: ' + this.dealer.total);

        if (this.dealer.total < 17) {
          this.hit();
        } else if (this.dealer.total > 21) {
          this.bust();
        } else {
          this.end();
        }
      }
    } else {
      // Draw a different card, this one is already in play
      this.hit();
    }

  };

  BlackJack.prototype.bust = function() {
    this.over = true;
    if (this.player.total > 21) {
      this.time -= Number(this.bet);
      this.messages.push('Oh no! You busted!');
    } else if (this.dealer.total > 21) {
      this.time += Number(this.bet);
      this.messages.push('Yes! The dealer busted!');
    }
    // PLAY AGAIN ?
    this.messages.push('Your winnings are currently at ' + this.time + ' minutes.' +
      '\n Thanks for playing! Hit RESET to play again!');
  };

  BlackJack.prototype.end = function() {
    this.over = true;
    if (this.player.total === 21) {
      this.time += 1.5 * Number(this.bet);
      this.messages.push('21!');
    } else if (this.dealer.total === 21) {
      this.time -= Number(this.bet);
      this.messages.push('Oh no! The dealer has 21!');
    } else if (this.player.total > this.dealer.total) {
      this.time += Number(this.bet);
      this.messages.push('You won this hand!');
    } else if (this.player.total === this.dealer.total) {
      this.messages.push('PUSH');
    } else {
      this.time -= Number(this.bet);
      this.messages.push('You lost this hand!');
    }
    // PLAY AGAIN ?
    if (this.time > 0) {
      this.messages.push(`Thanks for playing, you've got ${this.time} minutes to play!`);
    } else {
      this.messages.push(`Thanks for playing, but now you've got ${this.time * -1} minutes of work to do!`);
    }
    this.bet = 0;
  };

  return new BlackJack(0);
});
// app.service('myService', function() {
//
// });
