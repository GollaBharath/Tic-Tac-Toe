const dialog = document.querySelector("#nameDialog");
dialog.showModal();

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
		console.log(board);
	};

	let showBoard = () => {
		displayBoard(board);
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

function Player(name) {
	let score = 0;
	let getScore = () => score;
	let incrementScore = () => score++;
	return { name, getScore, incrementScore };
}

function getNames() {
	const player1 = document.querySelector("#p1").value;
	const player2 = document.querySelector("#p2").value;
	document.querySelector("#p1name").textContent = player1 + " (O)";
	document.querySelector("#p2name").textContent = player2 + " (X)";
	let Player1 = Player(player1);
	let Player2 = Player(player2);
	return [Player1, Player2];
}

function displayBoard(board) {
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

function updateScores(player1, player2) {
	document.querySelector("#p1score").textContent =
		"Score : " + player1.getScore();
	document.querySelector("#p2score").textContent =
		"Score : " + player2.getScore();
}

function gameEngine() {
	let [player1, player2] = getNames();
	let p1turn = true;
	if (Math.random() > 0.5) {
		p1turn = true;
	} else {
		p1turn = false;
	}
	gameBoard.showBoard();
	updateScores(player1, player2);
	playRound(player1, player2, p1turn);
}

function playRound(player1, player2, p1turn) {
	let cells = document.querySelectorAll(".cell");
	let WD = document.querySelector("#winner");
	let FD = document.querySelector("#final");
	let winnerText = WD.querySelector("p");
	let finalText = FD.querySelector("p");
	// Remove all old listeners by cloning nodes
	cells.forEach((cell) => {
		const newCell = cell.cloneNode(true);
		cell.parentNode.replaceChild(newCell, cell);
	});

	cells = document.querySelectorAll(".cell");

	cells.forEach((cell) => {
		cell.addEventListener("click", () => {
			let [x, y] = cell.getAttribute("data").split(" ").map(Number);
			let mark = p1turn ? -1 : 1; // O -> -1, X -> 1

			if (!gameBoard.markCell(x, y, mark)) {
				return;
			}

			gameBoard.showBoard();

			let winner = gameBoard.checkWin();

			if (winner !== 0) {
				if (winner === 1) {
					player2.incrementScore();
					console.log(`${player2.name} wins this round!`);
					winnerText.textContent = `${player2.name} wins this round!`;
					WD.showModal();
				} else if (winner === -1) {
					player1.incrementScore();
					console.log(`${player1.name} wins this round!`);
					winnerText.textContent = `${player1.name} wins this round!`;
					WD.showModal();
				}

				console.log(
					`Scores: ${player1.name} = ${player1.getScore()} | ${
						player2.name
					} = ${player2.getScore()}`
				);
				updateScores(player1, player2);
				if (player1.getScore() >= 3 || player2.getScore() >= 3) {
					console.log("🏆 Game Over!");
					finalText.textContent = `🏆 Game Over!`;
					FD.showModal();
					return;
				}

				gameBoard.reset();
				gameBoard.showBoard();
				playRound(player1, player2, !p1turn);
				return;
			}

			// Draw check
			if (gameBoard.isFull()) {
				console.log("Round Drawn!");
				winnerText.textContent = `Round Drawn!`;
				WD.showModal();
				gameBoard.reset();
				gameBoard.showBoard();

				playRound(player1, player2, !p1turn);
				return;
			}

			p1turn = !p1turn; // switch player for next click
		});
	});
}

function closeWD() {
	const WD = document.querySelector("#winner");
	WD.close();
}

function closeFD() {
	const FD = document.querySelector("#final");
	FD.close();
	window.location.reload();
}
