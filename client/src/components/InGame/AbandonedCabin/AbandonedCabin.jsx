import { useContext, useEffect, useState } from "react";
import Lockbox from "./Displays/Lockbox/Lockbox";
import "./AbandonedCabin.css";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../../context/RoomProvider";
import InGameMenu from "../InGameMenu";
import Cabin from "./Displays/Cabin";

const AbandonedCabin = (props) => {
  const { victory, gameOver } = props;
  const { currentRoom, setCurrentRoom } = useContext(RoomContext);
  const [hasEscapeKey, setHasEscapeKey] = useState(false);
  const [hasVictimList, setHasVictimList] = useState(false);
  const [escapeBoxOpened, setEscapeBoxOpened] = useState(false);
  const [victimsListBoxOpened, setVictimsListBoxOpened] = useState(false);
  const [lanternLit, setLanternLit] = useState(false);
  const [hasMatches, setHasMatches] = useState(false);
  const [victimsBoxCombination, setVictimsBoxCombination] = useState([]);
  const [victimsBoxNum1, setVictimsBoxNum1] = useState(0);
  const [victimsBoxNum2, setVictimsBoxNum2] = useState(0);
  const [victimsBoxNum3, setVictimsBoxNum3] = useState(0);
  const [victimsBoxNum4, setVictimsBoxNum4] = useState(0);
  const [escapeBoxCombination, setEscapeBoxCombination] = useState([]);
  const [escapeBoxNum1, setEscapeBoxNum1] = useState(0);
  const [escapeBoxNum2, setEscapeBoxNum2] = useState(0);
  const [escapeBoxNum3, setEscapeBoxNum3] = useState(0);
  const [escapeBoxNum4, setEscapeBoxNum4] = useState(0);
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  const [displayArraySelection, setDisplayArraySelection] = useState(0)
  const displayArray = [
    <Cabin 
      lanternLit={lanternLit}
      hasMatches={hasMatches}
      setLanternLit={setLanternLit}
      setHasMatches={setHasMatches}
      setDisplayArraySelection={setDisplayArraySelection}
      hasEscapeKey={hasEscapeKey}
      hasVictimList={hasVictimList}
      victory={victory}
    />,
    <Lockbox
      combination={victimsBoxCombination}
      lockboxType={"Victim's Box"}
      objective={"list of the murderer's victims"}
      setObjective={setHasVictimList}
      lockboxNum1={victimsBoxNum1}
      setLockboxNum1={setVictimsBoxNum1}
      lockboxNum2={victimsBoxNum2}
      setLockboxNum2={setVictimsBoxNum2}
      lockboxNum3={victimsBoxNum3}
      setLockboxNum3={setVictimsBoxNum3}
      lockboxNum4={victimsBoxNum4}
      setLockboxNum4={setVictimsBoxNum4}
      lockboxOpened={victimsListBoxOpened}
      setLockboxOpened={setVictimsListBoxOpened}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
    <Lockbox
      combination={escapeBoxCombination}
      lockboxType={"Escape Box"}
      objective={"key"}
      setObjective={setHasEscapeKey}
      lockboxNum1={escapeBoxNum1}
      setLockboxNum1={setEscapeBoxNum1}
      lockboxNum2={escapeBoxNum2}
      setLockboxNum2={setEscapeBoxNum2}
      lockboxNum3={escapeBoxNum3}
      setLockboxNum3={setEscapeBoxNum3}
      lockboxNum4={escapeBoxNum4}
      setLockboxNum4={setEscapeBoxNum4}
      lockboxOpened={escapeBoxOpened}
      setLockboxOpened={setEscapeBoxOpened}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
  ];


  

  const randomizeCombination = (combination, setCombination) => {
    const newCombination = [];
    for (let i = 0; i < 4; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      newCombination.push(randomDigit);
    }
    setCombination(newCombination);
    return combination;
  };

  const toggleMenuAction = () => {
    setMenuToggle(!menuToggle)
    setDisplayArraySelection(0)
  }

  const updateObjectives = (index) => {
    const updatedRoom = { ...currentRoom };
    updatedRoom.objectives[index].completed =
      !updatedRoom?.objectives[index].completed;
    setCurrentRoom(updatedRoom);
  };

  const checkForUpdates = () => {
    if (hasEscapeKey) {
      updateObjectives(1);
    } else if (hasVictimList) {
      updateObjectives(0);
    }
  };

  useEffect(() => {
    randomizeCombination(victimsBoxCombination, setVictimsBoxCombination);
    randomizeCombination(escapeBoxCombination, setEscapeBoxCombination);
  }, []);

  useEffect(() => {
    checkForUpdates();
  }, [hasVictimList, hasEscapeKey]);

  return (
    <>
      {menuToggle ? (
        <InGameMenu setMenuToggle={setMenuToggle} gameOver={gameOver}/>
      ) : (
        <div className={lanternLit ? "roomLit" : "roomDrk"}>
          {displayArray[displayArraySelection]}
        </div>
      )}
      <div className="inGameFooter">
        <button onClick={toggleMenuAction}>
          {menuToggle ? "Back to Game" : "Menu"}
        </button>
      </div>
    </>
  );
};

export default AbandonedCabin;
