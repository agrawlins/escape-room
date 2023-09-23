import { useContext } from "react"
import { PlaythroughContext } from "../../../context/PlaythroughProvider"


const Profile = ({setMenuIndexer}) => {
    const {playthroughs} = useContext(PlaythroughContext)
    return (
        <>
            <h1>PROFILE</h1>
            <button className="menuButton" onClick={() => setMenuIndexer(0)}>Main Menu</button>
        </>
    )
}

export default Profile