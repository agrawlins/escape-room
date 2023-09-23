import { useContext, useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import NewGame from "./NewGame/NewGame";
import HighScores from "./HighScores/HighScores";
import Profile from "./Profile/Profile";
import { RoomContext } from "../../context/RoomProvider";

const MainMenuNav = () => {
  const {getRooms} = useContext(RoomContext)
  const [menuIndexer, setMenuIndexer] = useState(0);

  useEffect(() => {
    getRooms()
}, [])

  switch (menuIndexer) {
    case 1:
      return <NewGame setMenuIndexer={setMenuIndexer} />;
    case 2:
      return <HighScores setMenuIndexer={setMenuIndexer} />;
    case 3:
      return <Profile setMenuIndexer={setMenuIndexer} />;
    default:
      return <MainMenu setMenuIndexer={setMenuIndexer} />;
  }
};

export default MainMenuNav;
