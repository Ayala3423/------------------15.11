import { useState } from 'react'
import PropTypes from 'prop-types'
import victoryGif from '../victoryGif.gif'

function GameBoard({ handleDelete, currentPlayers, playerName, isActive, changeActivePlayer, playerIndex }) {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100));
  const [steps, setSteps] = useState(0);
  const [scores, setScores] = useState(currentPlayers[playerIndex].scores);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleNewGame = () => {
    setNumber(Math.floor(Math.random() * 100));
    setSteps(0);
    setIsGameOver(false);
  };

  const handleOperation = (operation) => {
    let newNumber;
    switch (operation) {
      case 'add':
        newNumber = number + 1;
        break;
      case 'subtract':
        newNumber = number - 1;
        break;
      case 'multiply':
        newNumber = number * 2;
        break;
      case 'divide':
        newNumber = number / 2;
        break;
      default:
        newNumber = number;
        break;
    }

    if (Math.floor(newNumber) === 100) {
      victory();
    }

    setNumber(Math.floor(newNumber));
    changeActivePlayer();
    setSteps((prev) => prev + 1);
  };

  const victory = () => {
    updateScores();
    setIsGameOver(true);
  };

  const updateScores = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    let currentPlayer = users[playerName];
    if (Array.isArray(currentPlayer)) {
      currentPlayer = currentPlayer.find(
        (player) => player.password === currentPlayers[playerName].password
      );
    }
    if (currentPlayer) {
      currentPlayer.scores.push(steps);
    } else {
      console.error(`Player ${playerName} not found.`);
      return;
    }
    users[playerName] = currentPlayer;
    localStorage.setItem('users', JSON.stringify(users));
    setScores((prev) => [...prev, steps]);
    const event = new Event('updateLeadingPlayers');
    window.dispatchEvent(event);
  };

  return (
    <>
      <div className="screen">
        <div
          className="playDiv"
          style={{
            backgroundColor: isActive ? 'rgba(128, 128, 128, 0.5)' : 'white',
          }}
        >
          <h1 className="nameOfPlayer">Name: {playerName}</h1>
          <h2 className="randomNumber">Number: {number}</h2>
          <h2 className="numOfSteps">Steps: {steps}</h2>
          <h2 className="scores">Scores: {scores.join(', ')}</h2>
          {!isGameOver ? (
            <>
              <button
                className="multi2Button"
                onClick={() => handleOperation('multiply')}
                disabled={isActive}
              >
                *2
              </button>
              <button
                className="devide2Button"
                onClick={() => handleOperation('divide')}
                disabled={isActive}
              >
                /2
              </button>
              <button
                className="minus1Button"
                onClick={() => handleOperation('subtract')}
                disabled={isActive}
              >
                -1
              </button>
              <button
                className="plus1Button"
                onClick={() => handleOperation('add')}
                disabled={isActive}
              >
                +1
              </button>
            </>
          ) : (
            <>
              <button onClick={() => handleNewGame()}>New game</button>
              <button onClick={() => handleDelete(playerIndex)}>Log Out</button>
            </>
          )}
        </div>
        {isGameOver && (
          <img src={victoryGif} alt="Victory!" className="victoryGif" />
        )}
      </div>
    </>
  );
}

export default GameBoard;

GameBoard.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  changeActivePlayer: PropTypes.func.isRequired,
  playerIndex: PropTypes.number.isRequired,
  currentPlayers: PropTypes.object.isRequired,
};