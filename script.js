let gameBoard = (function () {
	// 0 - not filled
	// 1 - X
	// -1 - O
	let board = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];

	let reset = () => {
		board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		];
	};
	let showBoard = (p1, p2) => {
		displayBoard(board, p1, p2);
		return board;
	};
	let isFull = () => {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == 0) {
					return false;
				}
			}
		}
		return true;
	};
	let markCell = (x, y, p) => {
		if (board[x][y] != 0) {
			return false;
		} else {
			board[x][y] = p;
			return true;
		}
	};
	let checkWin = () => {
		for (let i = 0; i < 3; i++) {
			if (
				board[i][0] == board[i][1] &&
				board[i][1] == board[i][2] &&
				board[i][0] != 0
			) {
				return board[i][0];
			}
			if (
				board[0][i] == board[1][i] &&
				board[1][i] == board[2][i] &&
				board[0][i] != 0
			) {
				return board[0][i];
			}
		}
		if (
			board[0][0] == board[1][1] &&
			board[1][1] == board[2][2] &&
			board[0][0] != 0
		) {
			return board[0][0];
		}
		if (
			board[0][2] == board[1][1] &&
			board[1][1] == board[2][0] &&
			board[0][2] != 0
		) {
			return board[0][2];
		}
		return 0;
	};
	return { showBoard, reset, isFull, markCell, checkWin };
})();

getNames();

function Player(name) {
	let score = 0;
	let getScore = () => score;
	let incrementScore = () => score++;
	return { name, getScore, incrementScore };
}

function gameEngine(Player1, Player2, p1turn) {
	let player1 = Player(Player1);
	let player2 = Player(Player2);
	let cells = document.querySelectorAll(".cell");
	cells.forEach((cell) => {
		cell.addEventListener("click", () => {
			let loc = cell.getAttribute("data").split(" ").map(Number);
			if (p1turn) {
				var p = -1;
			} else {
				var p = 1;
			}
			let c = gameBoard.markCell(loc[0], loc[1], p);
			if (c) {
				p1turn = !p1turn;
				gameBoard.showBoard(player1, player2);
				if (gameBoard.isFull()) {
					console.log(
						"Scores : " + player1.getScore() + " <-> " + player2.getScore()
					);
					gameBoard.reset();
					console.log(gameBoard.showBoard(player1, player2));
				} else {
					if (player1.getScore() < 4 && player2.getScore() < 4) {
						if (gameBoard.checkWin() == 1) {
							player2.incrementScore();
							gameBoard.reset();
							gameBoard.showBoard(player1, player2);
						} else if (gameBoard.checkWin() == -1) {
							player1.incrementScore();
							gameBoard.reset();
							gameBoard.showBoard(player1, player2);
						}
					} else {
						console.log(
							"Final Scores : " +
								player1.getScore() +
								" <-> " +
								player2.getScore()
						);
					}
				}
			}
		});
	});
}

// GUI
function getNames() {
	const dialog = document.querySelector("#nameDialog");
	dialog.showModal();
	const Player1 = document.querySelector("#p1").value;
	const Player2 = document.querySelector("#p2").value;
	document.querySelector("#p1name").textContent = Player1 + " : O";
	document.querySelector("#p2name").textContent = Player2 + " : X";
	let p1turn = true;
	if (Math.random() > 0.5) {
		p1turn = true;
	} else {
		p1turn = false;
	}
	gameEngine(Player1, Player2, p1turn);
}

function displayBoard(board, p1, p2) {
	document.querySelector("#p1score").textContent = p1.getScore();
	document.querySelector("#p2score").textContent = p2.getScore();

	let cells = document.querySelectorAll(".cell");
	cells.forEach((cell) => {
		cell.removeChild(cell.lastChild);
		let value = document.createElement("p");
		let loc = cell.getAttribute("data").split(" ").map(Number);
		value.textContent =
			board[loc[0]][loc[1]] === 1
				? "X"
				: board[loc[0]][loc[1]] === -1
				? "O"
				: "";
		cell.appendChild(value);
	});
}
