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