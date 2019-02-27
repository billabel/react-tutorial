import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          row: 0,
          column: 0
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      playingBoard: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
      descendingSortOrder: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const row = calculateRow(i);
    const column = calculateColumn(i);

    // check for winner or if the square is filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // show the next player
    squares[i] = this.state.xIsNext ? "X" : "O";

    // store the move and toggle xIsNext
    this.setState({
      history: history.concat([
        {
          squares: squares,
          row: row,
          column: column
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  // update state when a move is selected
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  // toggle the sort order
  sortMoves(descendingSortOrder) {
    this.setState({
      descendingSortOrder: descendingSortOrder ? false : true
    });
  }

  resetGame() {
    window.location.reload();
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const descendingSortOrder = this.state.descendingSortOrder;
    const winningSquares = winner ? winner[1] : [];

    const moves = history.map((step, move) => {
      const desc = move
        ? "Move #" + move + " (" + step.row + ", " + step.column + ")"
        : "Empty board";
      return (
        <li key={move} className={isSelected(move, this.state.stepNumber)}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    // display a status message
    let status;
    if (winner) {
      status = "Winner: " + winner[0];
    } else if (this.state.stepNumber > 8) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winningSquares={winningSquares}
            playingBoard={this.state.playingBoard}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{descendingSortOrder ? moves.reverse() : moves}</ul>
          <button onClick={() => this.sortMoves(descendingSortOrder)}>
            Sort Moves
          </button>
          <button onClick={() => this.resetGame()}>New Game</button>
        </div>
      </div>
    );
  }
}

// Determine a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return null;
}

function calculateRow(square) {
  switch (square) {
    case 0:
      return 1;
    case 1:
      return 1;
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 2;
    case 5:
      return 2;
    case 6:
      return 3;
    case 7:
      return 3;
    case 8:
      return 3;
    default:
      return null;
  }
}

function calculateColumn(square) {
  switch (square) {
    case 0:
      return 1;
    case 3:
      return 1;
    case 6:
      return 1;
    case 1:
      return 2;
    case 4:
      return 2;
    case 7:
      return 2;
    case 2:
      return 3;
    case 5:
      return 3;
    case 8:
      return 3;
    default:
      return null;
  }
}

// Highligh the current move being displayed on the board from the history.
function isSelected(move, current) {
  if (move === current) {
    return "selected";
  }
}

export default Game;
