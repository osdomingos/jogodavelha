import { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    let btnCaption = 'Editar'
    if (isEditing) {
        btnCaption = 'Salvar'
    }

    const handleChange = ({ target }) => {
        setPlayerName(target.value)
    }

    return <li className={isActive ? 'active' : null}>
        <span className="player">
            {!isEditing ? <span className="player-name">{playerName}</span> :
                <input type='text' required value={playerName} onChange={handleChange} />
            }
            <span className="player-symbol">{symbol}</span>
            <button onClick={() => setIsEditing(editing => !editing)}>{btnCaption}</button>
        </span>
    </li>
}