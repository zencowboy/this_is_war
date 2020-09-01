window.onload = function(){
	//initializes game on load


	//card constructor
	function Card (numb){
		this.numb = numb;
		//this.suit = suit;
		this.name; // for eventuality of aces and king/queen/jack
	}
	//deck constructor with an empty array
	function Deck (){
		this.deck = [];
	}
	//player has a deck of cards
	function Player (){
		this.deck = [];
	}

	//creates a deck of 52 cards
	Deck.prototype.init = function(){
		for (var i=1; i <= 13; i++){
			for (var x=0; x < 4; x++){
				aCard = new Card(i);
				this.deck.push(aCard);
			}
		}
	}

	function shuffle(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}
	//puts half the cards in each.
	Deck.prototype.deal = function(){
		for (i = 0; i < this.deck.length; i++){
			if (i%2){
			    // console.log(this.deck[i]);
				player.deck.push(this.deck[i]);
			} else {
			    // console.log("will be p2 : " + this.deck[i]);
				computer.deck.push(this.deck[i]);
			}
		}
	};

	//Game constructor
	function Game(){
		this.winner;
		this.loser;
	};
	//cretes two players
	Game.prototype.init = function(){
		player = new Player();
		computer = new Player();
		// inits a the full deck
		var firstDeck = new Deck();
		firstDeck.init();
		//shuffles the deck
		shuffle(firstDeck.deck);
		console.log(firstDeck.deck);

		firstDeck.deal();
		// console.log("Player 1: ", player.deck);
		// console.log("Player 2: ", computer.deck);
	};
		game = new Game();
	game.init();

	$("#newGame").click(function(){
		game = new Game();
		game.init();
		$("#gameStatus").html(" ");
	});

	var flipped = false;

	$("#flip").click(function(){
		if (player.deck.length < 1){
			$("#gameStatus").html("You lose.");
		}
		else if (computer.deck.length < 1){
			$("#gameStatus").html("You win!");
		} else {
			$("#playerCard").removeClass('blank');
			console.log("removed, maybe?");
			$("#computerCard").removeClass('blank');
			$("#playerCard").html(player.deck[player.deck.length-1].numb);
			$("#computerCard").html(computer.deck[computer.deck.length-1].numb);
		}
		flipped = true;
	});


	$("#take").click(function(){
		//makes sure the cards have been flipped first
		if (flipped === true){
			game.compare();
			$("#playerCard").html(" ");
			$("#computerCard").html(" ");
			$("#playerCard").addClass('blank');
			$("#computerCard").addClass('blank');
		}
		flipped = false;
	});

//this works even if flip hasn't been clicked. Fix.
	Game.prototype.compare = function(){
	//if the player wins...
		var playerCard = player.deck[player.deck.length-1];
		var computerCard = computer.deck[computer.deck.length-1];
		// console.log("Player Card: " + playerCard.numb);
		// console.log("Computer Card: " + computerCard.numb);
		if(playerCard.numb > computerCard.numb){
			//put the card at the end of the player deck
			player.deck.unshift(computerCard);
			//and take it out of the computer deck.
			temp = player.deck.pop();
			player.deck.unshift(temp);
			computer.deck.pop();
		} else if (playerCard.numb < computerCard.numb){
			computer.deck.unshift(playerCard);
			temp = computer.deck.pop();
			computer.deck.unshift(temp);
			player.deck.pop();
			//for ties
		} else {
			$("#gameStatus").html("Breaking tie...");
			flipThree(1);
		}
		console.log("Player Deck: " + player.deck.length)
		console.log("Computer Deck: " + computer.deck.length)

	}

	//need to add validations all over this...
	var flipThree = function (start){
		start = start + 4;
		//these are the new cards we're comparing
		var pCard = player.deck[player.deck.length-start];
		var cCard = computer.deck[computer.deck.length-start];
		//take out all of the cards that get played
		//might have scoping issues with this
		temp = computer.deck.splice(computer.deck.length-(start), computer.deck.length-1);
		temp2 = player.deck.splice(player.deck.length-(start), player.deck.length-1);
		//if player is higher than computer
		if (pCard.numb > cCard.numb){
			//take out all of the ones five back through the end of the array
			//take the array of the cards taken out
			//and put each card in the beginning (bottom) of the player deck
			for (var i = 0; i < temp.length; i++){
				player.deck.unshift(temp[i]);
				player.deck.unshift(temp2[i]);
			}
		} else if(pCard.numb < cCard.numb){
				for (var i = 0; i < temp.length; i++){
					computer.deck.unshift(temp2[i]);
					computer.deck.unshift(temp[i]);
				}
			//for additional ties
		} else{
			flipThree(start);
		}
	}



} //end onload