import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { useState } from "react"
import { WINNING_COMBINATIONS } from './components/winning-combinations'

const PLAYERS = {
  X: 'Jogador 1',
  O: 'Jogador 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    if (gameBoard[row][col] === null) {
      gameBoard[row][col] = player
    }
  }

  return gameBoard
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

function deriveWinner(gameBoard, players) {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdquareSymbol = gameBoard[combination[2].row][combination[2].column]



    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdquareSymbol) {
      winner = firstSquareSymbol
    }
  }

  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = derivedActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  const draw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      const currentPlayer = derivedActivePlayer(prevTurns)

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer
        },
        ...prevTurns
      ]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...players,
        [symbol]: newName
      }
    })
  }

  return <main>
    <div id='game-container'>
      <ol id='players' className="highlight-player">
        <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X' ? true : false} onChangeName={handlePlayerNameChange} />
        <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O' ? true : false} onChangeName={handlePlayerNameChange} />
      </ol>
      {(winner || draw) && <GameOver winner={winner} handleRestart={handleRestart} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log logTurns={gameTurns} />
  </main>
}

export default App
