import { useContext, useEffect, useState } from "react";
import Lockbox from "./Displays/Lockbox/Lockbox";
import "./AbandonedCabin.css";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../../context/RoomProvider";
import InGameMenu from "../InGameMenu";
import Cabin from "./Displays/Cabin";
import Hint from "./Displays/Hint";
import { CabinContext } from "./CabinContext";

const AbandonedCabin = (props) => {
  const { victory, gameOver } = props;
  const { currentRoom, setCurrentRoom } = useContext(RoomContext);
  const {hasEscapeKey, setHasEscapeKey} = useContext(CabinContext);
  const {hasVictimList, setHasVictimList} = useContext(CabinContext);
  const {escapeBoxOpened, setEscapeBoxOpened} = useContext(CabinContext);
  const {victimsListBoxOpened, setVictimsListBoxOpened} = useContext(CabinContext);
  const {lanternLit, setLanternLit} = useContext(CabinContext);
  const {hasMatches, setHasMatches} = useContext(CabinContext);
  const {victimsBoxCombination, setVictimsBoxCombination} = useContext(CabinContext);
  const {victimsBoxNum1, setVictimsBoxNum1} = useContext(CabinContext);
  const {victimsBoxNum2, setVictimsBoxNum2} = useContext(CabinContext);
  const {victimsBoxNum3, setVictimsBoxNum3} = useContext(CabinContext);
  const {victimsBoxNum4, setVictimsBoxNum4} = useContext(CabinContext);
  const {escapeBoxCombination, setEscapeBoxCombination} = useContext(CabinContext);
  const {escapeBoxNum1, setEscapeBoxNum1} = useContext(CabinContext);
  const {escapeBoxNum2, setEscapeBoxNum2} = useContext(CabinContext);
  const {escapeBoxNum3, setEscapeBoxNum3} = useContext(CabinContext);
  const {escapeBoxNum4, setEscapeBoxNum4} = useContext(CabinContext);
  const {menuToggle, setMenuToggle} = useContext(CabinContext);
  const {victimsHintSelection, setVictimsHintSelection} = useContext(CabinContext);
  const {escapeHintSelection, setEscapeHintSelection} = useContext(CabinContext);
  const [displayArraySelection, setDisplayArraySelection] = useState(0);
  const navigate = useNavigate();
  const [victimsHintArray, setVictimsHintArray] = useState([
    <Hint
      comboIndex={0}
      hintType={"Victim"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
    <Hint
      comboIndex={1}
      hintType={"Victim"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
    <Hint
      comboIndex={2}
      hintType={"Victim"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
    <Hint
      comboIndex={3}
      hintType={"Victim"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
  ]);
  const [escapeHintArray, setEscapeHintArray] = useState([
    <Hint
      comboIndex={0}
      hintType={"Escape"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
    <Hint
      comboIndex={1}
      hintType={"Escape"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
    <Hint
      comboIndex={2}
      hintType={"Escape"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
    <Hint
      comboIndex={3}
      hintType={"Escape"}
      setDisplayArraySelection={setDisplayArraySelection}
    />,
  ]);
  const displayArray = [
    <Cabin
      lanternLit={lanternLit}
      hasMatches={hasMatches}
      escapeCombo={escapeBoxCombination}
      victimCombo={victimsBoxCombination}
      setLanternLit={setLanternLit}
      setHasMatches={setHasMatches}
      setDisplayArraySelection={setDisplayArraySelection}
      hasEscapeKey={hasEscapeKey}
      hasVictimList={hasVictimList}
      setVictimsHintSelection={setVictimsHintSelection}
      setEscapeHintSelection={setEscapeHintSelection}
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
    victimsHintArray[victimsHintSelection],
    escapeHintArray[escapeHintSelection],
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
    setMenuToggle(!menuToggle);
    setDisplayArraySelection(0);
  };

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
        <InGameMenu setMenuToggle={setMenuToggle} gameOver={gameOver} />
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
