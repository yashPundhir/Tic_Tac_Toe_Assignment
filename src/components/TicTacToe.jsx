import { Component } from "react";
import "./style.css";

class TicTacToe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: Array(9).fill(null),
			currentPlayer: "X",
			winner: null,
		};
	}

	handleCellClick(index) {
		if (this.state.board[index] || this.state.winner) {
			return;
		}

		const newBoard = [...this.state.board];
		newBoard[index] = this.state.currentPlayer;

		this.setState({
			board: newBoard,
			currentPlayer: this.state.currentPlayer === "X" ? "O" : "X",
			winner: this.checkWinner(newBoard),
		});
	}

	checkWinner(board) {
		const winningConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let condition of winningConditions) {
			const [a, b, c] = condition;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}

		return null;
	}

	render() {
		const { board, currentPlayer, winner } = this.state;

		return (
			<div className="tic-tac-toe">
				<h1 className="mb-10">Tic Tac Toe</h1>
				<div className="board ">
					{board.map((cell, index) => (
						<div
							key={index}
							className="cell"
							onClick={() => this.handleCellClick(index)}
						>
							{cell}
						</div>
					))}
				</div>
				{winner && <div className="winner">Winner: {winner}</div>}
				{!winner && !board.includes(null) && (
					<div className="draw">Its a draw!</div>
				)}
				<div className="current-player ">Current Player: {currentPlayer}</div>
				<button
					className="reset btn btn-outline btn-error border-2 text-xl h-16 w-28 mt-2"
					onClick={() =>
						this.setState({
							board: Array(9).fill(null),
							currentPlayer: "X",
							winner: null,
						})
					}
				>
					Reset
				</button>
			</div>
		);
	}
}

export default TicTacToe;
