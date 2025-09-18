let gameBoard = (function () {
	// 0 - not filled
	// 1 - X
	// -1 - O
	let isFull = false;
	let p1turn = true;
	let board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	let markCell = (x, y, p) => {
		if (board[x][y] == 0) {
			board[x][y] = p;
			p1turn = !p1turn;
			isFull = false;
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
		for (let x = 0; x < 3; x++) {
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
		let tie = true;
		for (let x = 0; x < 3; x++) {
			for (let y = 0; y < 3; y++) {
				if (board[x][y] == 0) {
					tie = false;
				}
			}
		}
		if (tie) {
			isFull = true;
			alert("This round is a tie. Play Again!!!");
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
	return { markCell, showBoard, checkWin, reset, isFull, p1turn };
})();

function Player(name) {
	let score = 0;
	let getScore = () => score;
	let incrementScore = () => score++;
	return { name, getScore, incrementScore };
}

function gameEngine(Player1, Player2) {
	let player1 = Player(Player1);
	let player2 = Player(Player2);
	while (player1.getScore() < 3 && player2.getScore() < 3) {
		gameBoard.reset();
		playRound(player1, player2);
	}
}

function playRound(Player1, Player2) {
	while (gameBoard.checkWin()) {
		if (!gameBoard.isFull) {
			mark();
			if (gameBoard.checkWin() == false) {
				if (!gameBoard.p1turn) {
					Player1.incrementScore();
					var winner = Player1.name;
				} else {
					Player2.incrementScore();
					var winner = Player2.name;
				}
				alert(winner + " has Won this round.");
				alert("Scores : " + Player1.getScore() + " <-> " + Player2.getScore());
			}
		} else {
			alert("Scores : " + Player1.getScore() + " <-> " + Player2.getScore());
		}
	}
}

function mark() {
	if (gameBoard.p1turn) {
		var p = -1;
		var [x, y] = prompt("player 1 marks in :").split(" ").map(Number);
	} else {
		var p = 1;
		var [x, y] = prompt("player 2 marks in :").split(" ").map(Number);
	}
	gameBoard.markCell(x, y, p);
	console.log(gameBoard.showBoard());
}

// GUI
function getNames() {
	const Player1 = document.querySelector("#p1").value;
	const Player2 = document.querySelector("#p2").value;
	gameEngine(Player1, Player2);
}
