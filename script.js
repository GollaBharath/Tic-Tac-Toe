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
		if (
			board[0][0] != 0 &&
			board[0][0] == board[1][1] &&
			board[1][1] == board[2][2]
		) {
			return false;
		}
		if (
			board[1][1] != 0 &&
			board[0][2] == board[1][1] &&
			board[2][0] == board[0][2]
		) {
			return false;
		}
		for (x = 0; x < 3; x++) {
			if (
				board[x][0] != 0 &&
				board[x][0] == board[x][1] &&
				board[x][1] == board[x][2]
			) {
				return false;
			}
			if (
				board[0][x] != 0 &&
				board[0][x] == board[1][x] &&
				board[1][x] == board[2][x]
			) {
				return false;
			}
		}

		return true;
	};
	let reset = () => {
		board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
	};
	let showBoard = () => board;
	return { markCell, showBoard, checkWin, reset };
})();

function Player(name) {
	let score = 0;
	let getScore = () => score;
	let incrementScore = () => score++;
	return { name, getScore, incrementScore };
}

let gameEngine = (function () {
	let player1 = Player(prompt("Enter player 1 name"));
	let player2 = Player(prompt("Enter player 2 name"));

	let p1turn = true;

	while (player1.getScore() < 3 && player2.getScore() < 3) {
		gameBoard.reset();
		playRound(player1, player2, p1turn);
	}
})();

function playRound(Player1, Player2, p1turn) {
	while (gameBoard.checkWin()) {
		mark(p1turn);
		if (gameBoard.checkWin() == false) {
			if (p1turn) {
				Player1.incrementScore();
				var winner = Player1.name;
			} else {
				Player2.incrementScore();
				var winner = Player2.name;
			}
			console.log(winner + " has Won this round.");
			console.log(
				"Scores : " + Player1.getScore() + " <-> " + Player2.getScore()
			);
			alert(winner + "has Won this round.");
			alert("Scores : " + Player1.getScore() + " <-> " + Player2.getScore());
		}
		p1turn = !p1turn;
	}
}

function mark(p1turn) {
	if (p1turn) {
		var p = -1;
		var [x, y] = prompt("player 1 marks in :").split(" ").map(Number);
	} else {
		var p = 1;
		var [x, y] = prompt("player 2 marks in :").split(" ").map(Number);
	}
	gameBoard.markCell(x, y, p);
	console.log(gameBoard.showBoard());
}
