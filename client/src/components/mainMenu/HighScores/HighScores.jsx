import { useContext, useEffect, useState } from "react"
import HSRoomList from "./Rooms/HSRoomList"
import { RoomContext } from "../../../context/RoomProvider"
import './HighScores.css'


const HighScores = ({setMenuIndexer}) => {
    const {rooms} = useContext(RoomContext)
    const [toggle, setToggle] = useState(false);


    

    return (
        <div className="newGame">
            <HSRoomList rooms={rooms} toggle={toggle} setToggle={setToggle}/>
            {toggle ? 
            <button className="menuButton" onClick={() => setToggle(!toggle)}>Back</button>
            :
            <button className="menuButton" onClick={() => setMenuIndexer(0)}>Main Menu</button>
            }
        </div>
    )
}

export default HighScores