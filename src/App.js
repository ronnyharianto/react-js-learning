import { useState } from 'react'

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [histories, setHistories] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = histories[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...histories.slice(0, currentMove + 1), nextSquares];
    setHistories(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleClick(i) {
    if (currentSquares[i] != null || calculateWinner(currentSquares))
      return;

    const nextSquares = currentSquares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    handlePlay(nextSquares);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = histories.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <div className="board-row">
            <Square value={currentSquares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={currentSquares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={currentSquares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={currentSquares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={currentSquares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={currentSquares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={currentSquares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={currentSquares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={currentSquares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

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
      return squares[a];
    }
  }
  return null;
}