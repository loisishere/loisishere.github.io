//$("input[name=game_level]:checked").val();

$(document).ready(function(){
	//Markers for the Tic Tac Toe Game
	var markers = ["X","O"];
	var player_marker, computer_marker,winner = null;
	var currently_playing = true;
	var game_board = [1,2,3,4,5,6,7,8,9];
	var winning_combo = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
	var selection = 1;
	var compwins =0;
	var plyrwins = 0;
	$("input[name=player]").on("change",function(){
		//Get the Marker from the input radio button
		player_marker = $("input[name=player]:checked").val();
		//get the opposite of the player's marker
		computer_marker = markers[Math.abs(markers.indexOf(player_marker)-1)];
		$("p").text("Player's turn");
	})
	$(".tile").click(function(){
		if(!player_marker){
	$("p").text("please select a marker");
	console.log(game_board);
}else{
	//disable the marker selection
	$("input[name=player]").prop("disabled",true);

	//check if there is a winner and if its the players turn
	if(!winner && currently_playing){

		if($(this).text()===""){
			selection = Number($(this).attr("id"));
			$(this).text(player_marker);
			game_board.splice(game_board.indexOf(selection),1);
			//check if you won the game
			if(checkWinner(player_marker)){
				winner= "player";
				$("p").text("You win!");
				plyrwins++;
		$(".play_wins > span").text(plyrwins);
			}
			//checks if the game ended in a draw :(
			else if(checkDraw()){
				$("p").text("Its A Draw!");
			}else{
				//if there are empty tiles and no winner
				currently_playing = false;
				computersTurn();
			}
		}
	}
	if(checkWinner(computer_marker)){
		winner = "Computer";
		$("p").text("Computer Wins!");
		compwins++;
		$(".comp_wins > span").text(compwins);
	}
}
	})

//Computer's turn
function computersTurn(){

	if(!currently_playing && !winner){
		$("p").text("Computer's turn");
		for(var i=0;i<winning_combo.length;i++){
		if (playerCheckWin(winning_combo[i],player_marker)) {
			$("#"+selection).text(computer_marker);
			game_board.splice(game_board.indexOf(selection),1);
			currently_playing = true;
			$("p").text("Player's turn");
			return;
		}
	}
	if(checkWinner(computer_marker)){
		winner = "Computer";
		$("p").text("Computer Wins!");
		compwins++;
		$(".comp_wins > span").text(compwins);
	}else if(checkDraw()){
		$("p").text("It's a Draw!");
		winner = "no one";
	}else{
	randomSelect();
	$("#"+selection).text(computer_marker);

	game_board.splice(game_board.indexOf(selection),1);
	currently_playing = true;
	$("p").text("Player's turn");
	return;
}
}
	
}
function randomSelect(){
	selection = Math.round(Math.random()*game_board.length);
	if(tileValues(selection) ===""){
		return true;
	}else{
		randomSelect();
	}
}
function playerCheckWin(combo,marker){
if(tileValues(combo[0]) === tileValues(combo[1]) && tileValues(combo[1])  === marker && tileValues(combo[2])=== ""){
	selection = combo[2];
	return true;
}if(tileValues(combo[1]) === tileValues(combo[2]) && tileValues(combo[1])  === marker && tileValues(combo[0])=== ""){
	selection = combo[0];
	return true;
}if(tileValues(combo[2]) === tileValues(combo[0]) && tileValues(combo[0])  === marker && tileValues(combo[1])=== ""){
	selection = combo[1];
	return true;
}
return false;
}
//if thes is a winner, return true
function checkWinner(marker){
	for(var i = 0; i<winning_combo.length;i++){
		if(checkTiles(winning_combo[i],marker)){
			return true;
		}
	}
return false;
}
//return if the game board is full and if there is no winner
function checkDraw(){
	return (gameBoardFull() && !winner);
}
//checks if the game board is full or if there are empty squares
function gameBoardFull(){
	for(var i=1;i<10;i++){
		if($("#"+i).text() ===""){
			return false;

		}
	}
	return true;
}
//check if this is a winning combo
function checkTiles(combo,marker){
	return (tileValues(combo[0]) === tileValues(combo[1]) && tileValues(combo[1])  === tileValues(combo[2]) && tileValues(combo[2])=== marker);
}
//get the the value of the tile, if it has an X or an O
function tileValues(val){
	return $("#"+val).text();
}
	//clear the board clean for a new game
	function newGame(){
	player_marker, computer_marker,winner = null;
	selection =1;
	game_board = [1,2,3,4,5,6,7,8,9];
	currently_playing = true;
	for(var i=1;i<10;i++){
		$("#" + i).text("");
	}
$("input[name=player]").prop("disabled",false);

	}
	$(".start").click(function(){
		newGame();
	})
})