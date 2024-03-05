export default function Log({ logTurns }) {
    return <ol id='log'>
        {
            logTurns.map((turn, index) => (
                <li key={index} className={index === 0 ? 'highlighted' : null}>
                    Jogador {turn.player} selecionou {turn.square.row},{turn.square.col}
                </li>
            ))
        }
    </ol>
}