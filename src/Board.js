import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  // draw the playing board using the playingBoard array from Game defined properties
  drawBoard(playingBoard) {
    // setup an empty array to build the board
    let grid = [];

    // iterate through the playingBoard array and add rows and columns to the grid using JSX code
    for (let i = 0; i < playingBoard.length; i++) {
      // setup to create columns for this row
      let columns = [];

      // create the columns for each row
      for (let j = 0; j < playingBoard[i].length; j++) {
        columns.push(this.renderSquare(playingBoard[i][j]));
      }

      // create each row, inserting the columns
      grid.push(<div key={i} className="board-row">{columns}</div>);
    }

    // return the full board JSX code
    return grid;
  }

  render() {
    const playingBoard = this.props.playingBoard;

    // create the JSX code for the board
    let board = this.drawBoard(playingBoard);

    // render the board
    return (
      <div>
        {board}
      </div>
    );
  }
}

export default Board;
