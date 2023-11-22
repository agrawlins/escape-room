import Lantern from "../Assets/Images/Lantern.png";
import Fire from "../Assets/Images/Fire.gif";

const Cabin = (props) => {
  const {
    hasMatches,
    lanternLit,
    setHasMatches,
    setLanternLit,
    setDisplayArraySelection,
    hasEscapeKey,
    hasVictimList,
    escapeCombo,
    victimCombo,
    victory,
    setVictimsHintSelection,
    setEscapeHintSelection,
  } = props;

  const acquireMatches = () => {
    if (!hasMatches) {
      setHasMatches(true);
      alert("You've acquired a match!");
    }
  };
  const lightLantern = () => {
    if (hasMatches) {
      setLanternLit(true);
    } else {
      alert("You need a match...");
    }
  };

  const selectHint = (display, hintValue, hintIndex, setHintSelection) => {
    setHintSelection(hintValue)
    setDisplayArraySelection(display)
  }

  return (
    <>
      <>
        <img
          src={Lantern}
          className="lantern"
          disabled={lanternLit ? "disabled" : null}
          onClick={lightLantern}
        />
        {lanternLit ? (
          <img
            src={Fire}
            className="fire"
            disabled={lanternLit ? "disabled" : null}
            onClick={lightLantern}
          />
        ) : (
          <></>
        )}
      </>
        <button
          disabled={hasMatches ? "disabled" : null}
          style={{ opacity: hasMatches ? "0" : "1" }}
          onClick={acquireMatches}
        >
          Matches
        </button>
      <div className="lockBoxes">
        <button onClick={() => setDisplayArraySelection(1)}>Victim's Box</button>
        <button onClick={() => setDisplayArraySelection(2)}>Escape Box</button>
      </div>
      <div className="hintsContainer">
        <div className="hintsCollection">
          <button className="hintButton" onClick={() => selectHint(3, 0, victimCombo[0], setVictimsHintSelection)}>Hint #1</button>
          <button className="hintButton" onClick={() => selectHint(3, 1, victimCombo[1], setVictimsHintSelection)}>Hint #2</button>
          <button className="hintButton" onClick={() => selectHint(3, 2, victimCombo[2], setVictimsHintSelection)}>Hint #3</button>
          <button className="hintButton" onClick={() => selectHint(3, 3, victimCombo[3], setVictimsHintSelection)}>Hint #4</button>
        </div>
        <div className="hintsCollection">
          <button className="hintButton" onClick={() => selectHint(4, 0, escapeCombo[0], setEscapeHintSelection)}>Hint #1</button>
          <button className="hintButton" onClick={() => selectHint(4, 1, escapeCombo[1], setEscapeHintSelection)}>Hint #2</button>
          <button className="hintButton" onClick={() => selectHint(4, 2, escapeCombo[2], setEscapeHintSelection)}>Hint #3</button>
          <button className="hintButton" onClick={() => selectHint(4, 3, escapeCombo[3], setEscapeHintSelection)}>Hint #4</button>
        </div>
      </div>
      <button
        disabled={hasEscapeKey && hasVictimList ? null : "disabled"}
        style={{ opacity: hasEscapeKey && hasVictimList ? "1" : "0%" }}
        className="escBtn"
        onClick={victory}
      >
        ESCAPE!
      </button>
    </>
  );
};

export default Cabin;
