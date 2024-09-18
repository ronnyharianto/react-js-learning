import { useState } from 'react'
import "./tictactoe.css";

function Square({ index, value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, currentSquares, onPlay, winner }) {
  const handleClick = (i) => {
    if (currentSquares[i] !== null || winner) return;

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="board-row">
          {[...Array(3)].map((_, j) => (
            <Square
              key={3 * i + j}
              index={3 * i + j}
              value={currentSquares[3 * i + j]}
              onSquareClick={() => handleClick(3 * i + j)}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove)
  }

  const calculateWinner = () => {
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
      const [a, b, c] = lines[i]
      if (
        currentSquares[a] &&
        currentSquares[a] === currentSquares[b] &&
        currentSquares[a] === currentSquares[c]
      ) {
        return currentSquares[a];
      }
    }

    return null;
  }

  const winner = calculateWinner();
  let status
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const moves = history.map((value, index) => {
    let description;

    if (index == history.length - 1) {
      description = winner ? `Winner ${winner}` : 'You are at the move #' + index;
    }
    else if (index > 0) {
      description = 'Go to move #' + index;
    } 
    else {
      description = 'Go to game start';
    }

    return (
      <li key={index}>
        {index == history.length - 1 ? <label>{description}</label> : <button onClick={() => jumpTo(index)}>{description}</button>}
      </li>
    );
  })

  return (
    <>
      <div className="game">
        <div className="game-board">
          <div className="status">{status}</div>
          <Board
            xIsNext={xIsNext}
            currentSquares={currentSquares}
            onPlay={handlePlay}
            winner={winner} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}