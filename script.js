let gameBoard = (function () {
	// 0 - not filled
	// 1 - X
	// -1 - O
	let board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	let markCell = (x, y, p) => {
		if (board[x][y] == 0) {
			board[x][y] = p;
		}
	};
	let checkWin = () => {
		let rowMatched = true;
		for (let x = 0; x < 3; x++) {
			let mark = board[x][0];
			for (let y = 0; y < 3; y++) {
				if ((mark != board[x][y]) & (mark != 0)) {
					rowMatched = false;
				}
			}
		}
		return rowMatched;
	};
	let showBoard = () => board;
	return { markCell, showBoard, checkWin };
})();

function Player(name) {
	let score = 0;
	getScore = () => score;
	incrementScore = () => score++;
	return { name, getScore, incrementScore };
}

let gameEngine = (function () {
	let player1 = Player(prompt("Enter player 1 name"));
	let player2 = Player(prompt("Enter player 2 name"));

	let p1turn = true;
	let gameOn = true;
	while (gameOn) {
		playRound(player1, player2, p1turn);
	}
})();

function playRound(Player1, Player2, p1turn) {
	while (gameBoard.checkWin()) {
		mark(p1turn);
		if (gameBoard.checkWin() == false) {
			let winner = "";
			if (p1turn) {
				Player1.incrementScore();
				winner = Player1.name;
			} else {
				Player2.incrementScore();
				winner = Player2.name;
			}
			console.log(winner + "Won The game.");
			console.log("Scores : " + Player1.getScore() + Player2.getScore());
		}
		p1turn = !p1turn;
	}
}

function mark(p1turn) {
	if (p1turn) {
		var p = -1;
		[x, y] = prompt("player 1 marks in :").split(" ");
	} else {
		var p = 1;
		[x, y] = prompt("player 2 marks in :").split(" ");
	}
	gameBoard.markCell(x, y, p);
	console.log(gameBoard.showBoard());
}
