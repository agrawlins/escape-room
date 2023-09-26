import { useContext, useState } from "react";
import Lockbox from "./Lockbox";
import "./AbandonedCabin.css";
import { useNavigate } from "react-router-dom";

const AbandonedCabin = (props) => {
  const { victory } = props;
  const [hasEscapeKey, setHasEscapeKey] = useState(false);
  const [hasVictimList, setHasVictimList] = useState(false);
  const [escapeBoxOpened, setEscapeBoxOpened] = useState(false);
  const [victimsListBoxOpened, setVictimsListBoxOpened] = useState(false);
  const [lanternLit, setLanternLit] = useState(false);
  const [hasMatches, setHasMatches] = useState(false);
  const [victimsBoxNum1, setVictimsBoxNum1] = useState(0);
  const [victimsBoxNum2, setVictimsBoxNum2] = useState(0);
  const [victimsBoxNum3, setVictimsBoxNum3] = useState(0);
  const [victimsBoxNum4, setVictimsBoxNum4] = useState(0);
  const [escapeBoxNum1, setEscapeBoxNum1] = useState(0);
  const [escapeBoxNum2, setEscapeBoxNum2] = useState(0);
  const [escapeBoxNum3, setEscapeBoxNum3] = useState(0);
  const [escapeBoxNum4, setEscapeBoxNum4] = useState(0);
  const navigate = useNavigate();


  const acquireMatches = () => {
    setHasMatches(true);
    alert("You've acquired a box of matches!");
  };
  const lightLantern = () => {
    setLanternLit(true);
  };

  const attemptEscape = () => {
    if (hasEscapeKey && hasVictimList) {
      victory();
    }
  };

  return (
    <>
      <div className={lanternLit ? "roomLit": "roomDrk"}>
        <Lockbox
          combination={[1, 2, 3, 5]}
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
        />
        <Lockbox
          combination={[4, 5, 6, 8]}
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
        />
        {hasEscapeKey && hasVictimList ? (
          <button className="escBtn" onClick={attemptEscape}>
            ESCAPE!
          </button>
        ) : (
          <button className="escBtnDis" disabled onClick={attemptEscape}>
            ESCAPE!
          </button>
        )}
      </div>
    </>
  );
};

export default AbandonedCabin;
