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
    victory,
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

      <div>
        <button onClick={() => setDisplayArraySelection(1)}>
          Victim's Box
        </button>
        <button
          disabled={hasMatches ? "disabled" : null}
          style={{ opacity: hasMatches ? "0%" : "1" }}
          onClick={acquireMatches}
        >
          Matches
        </button>
        <button onClick={() => setDisplayArraySelection(2)}>Escape Box</button>
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
