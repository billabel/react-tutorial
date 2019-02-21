import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        row: 0,
        column: 0,
      }],
      xIsNext: true,
      stepNumber: 0,
      playingBoard: [[0,1,2],[3,4,5],[6,7,8]],
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const row = calculateRow(i);
    const column = calculateColumn(i);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        row: row,
        column: column,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' (' + step.row + ', ' + step.column + ')' :
        'Go to game start';
      return (
        <li key={move} className={isSelected(move, this.state.stepNumber)}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            playingBoard={this.state.playingBoard}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateRow(square) {
  switch(square) {
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
  switch(square) {
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
    return 'selected';
  };
}

export default Game;
