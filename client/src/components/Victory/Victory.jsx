import { useContext } from "react"
import { RoomContext } from "../../context/RoomProvider"
import { PlaythroughContext } from "../../context/PlaythroughProvider"
import { useNavigate } from "react-router-dom"


const Victory = () => {
    const {currentRoom, currentTime} = useContext(RoomContext)
    const {addPlaythrough} = useContext(PlaythroughContext)
    const {timeLimit, gameOverText, _id} = currentRoom
    const navigate = useNavigate()

    const mainMenuReturn = () => {
        const newPlaythrough = {
            time: (timeLimit - currentTime),
            room: _id
        }
        addPlaythrough(newPlaythrough)
        navigate('/mainmenu')
    }
    return(
        <>
            <h1>Victory</h1>
            <h2>You made it!</h2>
            <button onClick={mainMenuReturn}>Main Menu</button>
        </>
    )
}

export default Victory