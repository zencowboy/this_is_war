window.onload = function(){
	//initializes game on load


	//card constructor "blueprint"
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
		for (let i=1; i <= 13; i++){
			for (let x=0; x < 4; x++){
				aCard = new Card(i);
				this.deck.push(aCard);
			}
		}
	}

	function shuffle(array) {
	    for (let i = array.length - 1; i > 0; i--) {
	        let j = Math.floor(Math.random() * (i + 1));
	        let temp = array[i];
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

	//Game constructor "blue print"
	function Game(){
		this.winner;
		this.loser;
	};
	//creates two players
	Game.prototype.init = function(){
		player = new Player();
		computer = new Player();
		// inits a the full deck
		let firstDeck = new Deck();
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

	let flipped = false;

	$("#flip").click(function(){
		if(!flipped){
			if (player.deck.length < 1){
				$("#gameStatus").html("You've lost the War!.");
			}
			else if (computer.deck.length < 1){
				$("#gameStatus").html("You've lost the War!");
			} else {
				$("#playerCard").removeClass('blank');
				console.log("removed, maybe?");
				$("#computerCard").removeClass('blank');
				$("#topPlayerCard").html(player.deck[player.deck.length-1].numb);
				$("#bottomPlayerCard").html(player.deck[player.deck.length-1].numb);
				$("#topComputerCard").html(player.deck[player.deck.length-1].numb);
				$("#bottomComputerCard").html(player.deck[player.deck.length-1].numb);
	
			}
			game.compare();
			flipped = true;
		}
		
		
	});


	$("#take").click(function(){
		//makes sure the cards have been flipped first
		if (flipped === true){
			$("#playerCard").html(" ");
			$("#computerCard").html(" ");
			$("#playerCard").addClass('blank');
			$("#computerCard").addClass('blank');
			$("#gameStatus").html("")
		}
		flipped = false;
		
	});

	Game.prototype.compare = function(){
	//if the player wins...
		let playerCard = player.deck[player.deck.length-1];
		let computerCard = computer.deck[computer.deck.length-1];
		
		console.log("Player Card: " + playerCard.numb);
		console.log("Computer Card: " + computerCard.numb);
		if(playerCard.numb > computerCard.numb){
			console.log("you won round");
			$("#gameStatus").html("You win!");
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
			$("#gameStatus").html("You lose!");
			//for ties
		} else {
			$("#gameStatus").html("Breaking tie...");
			this.flipFour(1);
		}
		// console.log("Player Deck: " + player.deck.length)
		// console.log("Computer Deck: " + computer.deck.length)

		document.getElementById("player-score").innerHTML = "Score: " + player.deck.length;
		document.getElementById("computer-score").innerHTML = "Score: " + computer.deck.length;
		console.log(player.deck)
		console.log(computer.deck)
	}
	
	Game.prototype.flipFour = function() {
		//take four out of each deck
		let playerFlipFour = player.deck.splice(0,4)
		let computerFlipFour = computer.deck.splice(0,4)
		console.log("DRAW")
		
		let playerSum = 0;
		let computerSum =0;

		for (let i=0; i <4; i++) {
			playerSum += playerFlipFour[i].numb;
			$('#playerBreak .lCard:eq('+i+')').html(playerFlipFour[i].numb)
			computerSum += computerFlipFour[i].numb;
			$('#computerBreak .lCard:eq('+i+')').html(computerFlipFour[i].numb)
		}

		if(playerSum > computerSum){
				console.log("you won the Break");
			$("#gameStatus").html("You won the Break!");
			//put the cards at the end of the player deck
			while(playerFlipFour.length > 0){
				player.deck.push(playerFlipFour.pop());
			}
			while(computerFlipFour.length > 0){
				player.deck.push(computerFlipFour.pop())
			}


		} else if (playerSum < computerSum){
			console.log("you lost the Break");
			$("#gameStatus").html("You won the Break!");
			while(playerFlipFour.length > 0){
				computer.deck.push(playerFlipFour.pop());
			}
			while(computerFlipFour.length > 0){
				computer.deck.push(computerFlipFour.pop())
			}
				$("#gameStatus").html("You lose!");

		}
		else {
			$("#gameStatus").html("Breaking tie again");

			while(playerFlipFour.length > 0){
				player.deck.push(playerFlipFour.pop());
			}
			while(computerFlipFour.length > 0){
				computer.deck.push(computerFlipFour.pop())
			}
			console.log(player.deck);
			console.log(computer.deck);
			//this.flipFour();
		}

	// //sum the four cards 
		console.log("Player Card: " + playerSum, playerFlipFour);
		console.log("Computer Card: " + computerSum, computerFlipFour);

	}

	}
