import { useContext } from "react"
import { RoomContext } from "../../context/RoomProvider"
import { useNavigate } from "react-router-dom"
import { PlaythroughContext } from "../../context/PlaythroughProvider"


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
        <>
            <h1>Game Over!</h1>
            <h2>{gameOverText}</h2>
            <button onClick={mainMenuReturn}>Return to Main Menu</button>
        </>
    )
}

export default GameOver