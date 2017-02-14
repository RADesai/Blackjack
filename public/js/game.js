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
  $scope.game = Game;
  return true;
});

app.factory('Game', function () {
  // IMPORT
  var BlackJack = function(time) {
    this.time = time;
    this.bet = 0;
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
        // He stays, check messages.push(
        this.end();
      } else {
        // Dealer has to hit again
        this.hit();
      }
    // }
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
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = false;                                              // change turn
        } else {
          this.player.hand[1].suit = randomSuit;                                // adjust hand suit
          this.player.hand[1].value = this.deck[randomSuit][randomCard];        // adjust hand value
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = false;
        }
      } else {                                                                  // Dealer's turn
        if (this.dealer.hand[0].suit === 'unknown') {                           // First card for dealer
          this.dealer.hand[0].suit = randomSuit;                                // adjust hand suit
          this.dealer.hand[0].value = this.deck[randomSuit][randomCard];        // adjust hand value
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = true;                                               // change turn
        } else {
          this.dealer.hand[1].suit = randomSuit;                                // adjust hand suit
          this.dealer.hand[1].value = this.deck[randomSuit][randomCard];        // adjust hand value
          this.deck[randomSuit][randomCard] = '';                               // adjust deck
          this.playerTurn = true;
        }
      }
    } else {
      // Draw a different card
      console.log('It seems a card was already drawn ... a different card will be drawn instead.');
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
      } else {
        this.dealer.total += Number(this.dealer.hand[i].value);
      }
    }
    for (var j = 0; j < this.player.hand.length; j++) {                           //  iterate over players hand
      if (this.player.hand[j].value === 'J' || this.player.hand[j].value === 'Q' || this.player.hand[j].value === 'K') {
        this.player.total += 10;
      } else if (this.player.hand[j].value === 'A') {
        this.player.total += 11;
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
        this.updateScore();
        this.messages.push('You just drew: ' + this.deck[randomSuit][randomCard] + ' of ' + randomSuit +
        '\n your total is now at: ' + this.player.total);
        if (this.player.total > 21) {
          // console.log('player busted with:', this.player.hand);
          this.playerTurn = false;
          this.bust();
        } else {
          // this.playerMove(); /// CHECK FROM HERE ---
        }
      } else {                                                                  // Dealer's turn
        this.dealer.hand.push({
          suit : randomSuit,
          value : this.deck[randomSuit][randomCard]
        });
        this.updateScore();

        // Inform player what the Dealer drew ------
        this.messages.push('The dealer just drew: ' + this.deck[randomSuit][randomCard] + ' of ' + randomSuit +
        '\n his total is now at: ' + this.dealer.total);

        if (this.dealer.total < 17) {
          // console.log('dealer hits again', this.dealer.hand);
          this.hit();
        } else if (this.dealer.total > 21) {
          // console.log('dealer busted with:', this.dealer.hand);
          this.bust();
        } else {
          // console.log('dealer has a viable hand', this.dealer.hand);
          this.end();
        }
      }
    } else {
      // Draw a different card, this one is already in play
      // console.log('It seems a card was already drawn ... a different card will be drawn instead.');
      this.hit();
    }

  };

  BlackJack.prototype.bust = function() {
    this.over = true;
    console.log('Player Hands after a bust:');
    console.log('Player Hand :', this.player.hand);
    console.log('Dealer Hand :', this.dealer.hand);
    if (this.player.total > 21) {
      this.time -= Number(this.bet);
      // alert('Oh no! You busted!');
      this.messages.push('Oh no! You busted!');
    } else if (this.dealer.total > 21) {
      this.time += Number(this.bet);
      // alert('Yes! The dealer busted!');
      this.messages.push('Yes! The dealer busted!');
    }
    // PLAY AGAIN ?
    // setTimeout(function() {
      this.messages.push('Your winnings are currently at ' + this.time + ' minutes.' +
        '\n Thanks for playing! Hit RESET to play again!');
    // }, 1500);
  };

  BlackJack.prototype.end = function() {
    // Declare a winner
    // Check for blackjack ...
    this.over = true;
    console.log('Player Hands @ end:');
    console.log('Player Hand :', this.player.hand);
    console.log('Dealer Hand :', this.dealer.hand);
    if (this.player.total === 21) {
      this.time += 1.5 * Number(this.bet);
      // alert('BLACKJACK!' +
      // '\n' + this.dealer.total + ' to ' + this.player.total);
      this.messages.push('BLACKJACK!');
    } else if (this.dealer.total === 21) {
      this.time -= Number(this.bet);
      // alert('Oh no! The dealer has BLACKJACK!' +
      // '\n' + this.dealer.total + ' to ' + this.player.total);
      this.messages.push('Oh no! The dealer has BLACKJACK!');
    } else if (this.player.total > this.dealer.total) {
      this.time += Number(this.bet);
      // alert('You won this hand!' +
      // '\n' + this.dealer.total + ' to ' + this.player.total);
      this.messages.push('You won this hand!');
    } else if (this.player.total === this.dealer.total) {
      // alert('This round is a push!');
      this.messages.push('PUSH');
    } else {
      this.time -= Number(this.bet);
      // alert('You lost this hand!' +
      // '\n' + this.dealer.total + ' to ' + this.player.total);
      this.messages.push('You lost this hand!');
    }
    // PLAY AGAIN ?
    // var move = prompt('Your winnings are currently at ' + this.time + ' minutes.' +
    //   '\n Would you like to play again? Please enter "y" for yes or "n" if not.', 'y');
    // if (move === 'y') {
    //   var newGame = new BlackJack(this.time);
    // } else {
      // if time is negative -- they have to work
    if (this.time > 0) {
      // alert("Thanks for playing, but now you've got " + this.time + " minutes to play!");
      this.messages.push("Thanks for playing, but now you've got " + this.time + " minutes to play!");
    } else {
      // alert("Thanks for playing, but now you've got " + this.time * -1 + " minutes of work to do!");
      this.messages.push("Thanks for playing, but now you've got " + this.time * -1 + " minutes of work to do!");
    }
    this.bet = 0;
  };
  var returnGame = new BlackJack(0);

  return returnGame;
});
app.service('myService', function() {

});
