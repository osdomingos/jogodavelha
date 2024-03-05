export default function GameOver({ winner, handleRestart }) {
    return <div id='game-over'>
        <h2>Fim de Jogo!</h2>
        {winner && <p>{winner} ganhou!</p>}
        {!winner && <p>Empate</p>}
        <p>
            <button onClick={handleRestart}>Novo jogo</button>
        </p>
    </div>
}