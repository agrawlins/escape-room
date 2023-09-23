import { useContext, useEffect, useState } from "react"
import RoomList from "./Rooms/RoomList"
import { RoomContext } from "../../../context/RoomProvider"
import './NewGame.css'


const NewGame = ({setMenuIndexer}) => {
    const {rooms} = useContext(RoomContext)
    const [toggle, setToggle] = useState(false)

    

    return (
        <div className="newGame">
            <RoomList rooms={rooms} toggle={toggle} setToggle={setToggle}/>
            {toggle ? 
            <button className="menuButton" onClick={() => setToggle(!toggle)}>Back</button>
            :
            <button className="menuButton" onClick={() => setMenuIndexer(0)}>Main Menu</button>
            }
        </div>
    )
}

export default NewGame