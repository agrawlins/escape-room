import { useContext } from "react"
import { RoomContext } from "../../context/RoomProvider"
import { useNavigate } from "react-router-dom"
import { PlaythroughContext } from "../../context/PlaythroughProvider"
import './GameOver.css'


const GameOver = () => {
    const {currentRoom} = useContext(RoomContext)
    const {addPlaythrough} = useContext(PlaythroughContext)
    const {gameOverText, _id} = currentRoom
    const navigate = useNavigate()

    const mainMenuReturn = () => {
        const newPlaythrough = {
            time: 0,
            room: _id
        }
        addPlaythrough(newPlaythrough)
        navigate('/mainmenu')
    }
    return(
        <div className="gameOver">
            <h1 className="gameOverHeader">GAME OVER!</h1>
            <h2 className="gameOverText">{gameOverText}</h2>
            <button className="menuButton" onClick={mainMenuReturn}>Main Menu</button>
        </div>
    )
}

export default GameOver