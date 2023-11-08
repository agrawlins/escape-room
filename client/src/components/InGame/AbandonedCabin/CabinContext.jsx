import React, { useContext, useEffect, useState } from "react";

export const CabinContext = React.createContext();

const CabinProvider = (props) => {
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
  const [victimsHintSelection, setVictimsHintSelection] = useState(0);
  const [escapeHintSelection, setEscapeHintSelection] = useState(0);

  return (
    <CabinContext.Provider
      value={{
        hasEscapeKey,
        hasVictimList,
        escapeBoxOpened,
        victimsListBoxOpened,
        escapeBoxCombination,
        victimsBoxCombination,
        escapeBoxNum1,
        escapeBoxNum2,
        escapeBoxNum3,
        escapeBoxNum4,
        victimsBoxNum1,
        victimsBoxNum2,
        victimsBoxNum3,
        victimsBoxNum4,
        escapeHintSelection,
        victimsHintSelection,
        menuToggle,
        lanternLit,
        hasMatches,
        setHasEscapeKey,
        setHasVictimList,
        setEscapeBoxOpened,
        setVictimsListBoxOpened,
        setEscapeBoxCombination,
        setVictimsBoxCombination,
        setEscapeBoxNum1,
        setEscapeBoxNum2,
        setEscapeBoxNum3,
        setEscapeBoxNum4,
        setVictimsBoxNum1,
        setVictimsBoxNum2,
        setVictimsBoxNum3,
        setVictimsBoxNum4,
        setEscapeHintSelection,
        setVictimsHintSelection,
        setMenuToggle,
        setLanternLit,
        setHasMatches,
      }}
    >
      {props.children}
    </CabinContext.Provider>
  );
};

export default CabinProvider;
