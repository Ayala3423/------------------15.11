import { useState } from 'react'
import GameBoard from "./GameBoard"
import Registration from './Registration'

function PlayersBoard() {
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [playersCount, setPlayersCount] = useState(1);
    const [isGameStart, setIsGameStart] = useState(false);
    const [activePlayer, setActivePlayer] = useState(0);
    const [isGameVisible, setIsGameVisible] = useState(
        Array(playersCount).fill(true)
    );
    const [isRegistrationVisible, setIsRegistrationVisible] = useState(
        Array(playersCount).fill(true)
    );

    const changeActivePlayer = () => {
        setActivePlayer(prev => (prev + 1) % playersCount);
    }

    const handleDelete = (index) => {
        setCurrentPlayers(prev => prev.filter((_, i) => i !== index));
        setIsGameVisible(prev => prev.filter((_, i) => i !== index));
        setIsRegistrationVisible(prev => prev.filter((_, i) => i !== index));
        setPlayersCount(prev => prev - 1);
        setIsGameStart(false);
    };    

    const addPlayer = () => {
        setPlayersCount(prevCount => prevCount + 1);
        setIsRegistrationVisible(prevVisible => [...prevVisible, true]);
        setIsGameVisible(prevVisible => [...prevVisible, true]);
    };

    const removePlayer = () => {
        if (playersCount > 1) {
            setPlayersCount(prevCount => prevCount - 1);
            setIsRegistrationVisible(prevVisible => prevVisible.slice(0, -1));
        }
    };

    const handleStartGame = () => {
        setIsGameStart(true);
        console.log("Current Players:", currentPlayers);
    }

    return (
        <>
            <button onClick={handleStartGame} disabled={isGameStart}>Start Game</button>
            <button className='addUserButton' onClick={addPlayer} disabled={isGameStart}>+</button>
            <button className='removeUserButton' onClick={removePlayer} disabled={isGameStart || playersCount <= 1}>-</button>
            <div className="player-board">
                {Array.from({ length: playersCount }).map((_, index) => (
                    isRegistrationVisible[index] ?
                        <Registration key={index} className="registration-form"
                            setIsRegistrationVisible={setIsRegistrationVisible}
                            setCurrentPlayers={setCurrentPlayers}
                            index={index} />
                        : (isGameVisible[index] &&
                            <GameBoard key={index}
                                handleDelete={handleDelete}
                                currentPlayers={currentPlayers}
                                playerName={currentPlayers[index].name}
                                isActive={(activePlayer === index) && isGameStart ? false : true}
                                changeActivePlayer={changeActivePlayer}
                                playerIndex={index} />)
                ))};
            </div>
        </>
    );
}

export default PlayersBoard;