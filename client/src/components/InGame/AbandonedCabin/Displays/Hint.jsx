import { useContext, useEffect, useState } from "react";
import { CabinContext } from "../CabinContext";

const Hint = (props) => {
  const { comboIndex, hintType, setDisplayArraySelection } = props;
  const {
    victimsBoxCombination,
    escapeBoxCombination,
    hintLocation,
    falseHint,
  } = useContext(CabinContext);

  const determineHintType = () => {
    if (hintType === "Victim") {
      return victimsBoxCombination[comboIndex];
    } else {
      return escapeBoxCombination[comboIndex];
    }
  };

  const determineHintLocation = () => {
    switch (hintLocation) {
      case 0:
        return (
          <>
          <p>{determineDate(determineHintType())}</p>
          <p>{determineMessage(falseHint)}</p>
            <p>{comboIndex + 1}</p>
          </>
        );
      case 1:
        return (
          <>
          <p>{determineDate(falseHint)}</p>
          <p>{determineMessage(determineHintType())}</p>
            <p>{comboIndex + 1}</p>
          </>
        );
      default:
        return (
          <>
          <p>{determineDate(falseHint)}</p>
          <p>{determineMessage(comboIndex + 1)}</p>
            <p>{determineHintType()}</p>
          </>
        );
    }
  };

  const determineDate = (number) => {
    switch (number) {
      case 1:
        return "January 6th, 1974";
      case 2:
        return "February 14th, 1974";
      case 3:
        return "March 6th, 1974";
      case 4:
        return "April 6th, 1974";
      case 5:
        return "May 6th, 1974";
      case 6:
        return "June 4th, 1974";
      case 7:
        return "July 4th, 1974";
      case 8:
        return "August 2nd, 1974";
      case 9:
        return "September 11th, 1974";
      default:
        return "October 31st, 1974";
    }
  };

  const determineMessage = (number) => {
    switch (number) {
      case 1:
        return "Today, I started a new path. My first kill... it was glorious! He never even saw me coming, the poor fool.";
      case 2:
        return "Valentine's day; how quaint! Nothing says romance like two people, gasping for breath, and begging for their lives...";
      case 3:
        return "The luck of the Irish, indeed! I was lucky enough to spot a fellow, blissfully dancing along the railroad tracks. No one told him that the third rail was electrified...";
      case 4:
        return `"April fools, right?" That's what my latest victim kept asking...`;
      case 5:
        return "Question: What's best thing about May flowers? Answer: They're excellent for decorating graves...'";
      case 6:
        return "I watched a poor fellow run over hiz foot with a lawn mower. The poor fellow looked uncomplete, so I decided to fiks that for him...";
      case 7:
        return "Fourth of July! A time for barbecues, fireworks, and arson...";
      case 8:
        return "I learnd somethIng new today; Gasoline, and a visit to the local retirement Home make for a killer combinaTion!";
      case 9:
        return "Today's kill was a bit odd; I couldn't find anyone this week, so I settled on a stray cat. I wonder how many lives it has left...?";
      case 0:
        return "Halloween! My favorite day of the year; people witness a murder in a haunted house, and think NOTHING of it...";
    }
  };

  return (
    <div className="hint">
      {determineHintLocation()}
      <button onClick={() => setDisplayArraySelection(0)}>Back</button>
    </div>
  );
};

export default Hint;