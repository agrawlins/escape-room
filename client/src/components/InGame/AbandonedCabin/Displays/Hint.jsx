import { useContext, useEffect, useState } from "react";
import { CabinContext } from "../CabinContext";

const Hint = (props) => {
    const { comboIndex, hintType, setDisplayArraySelection } = props;
    const {victimsBoxCombination, escapeBoxCombination } = useContext(CabinContext)
    const [date, setDate] = useState(0)
    const [message, setMessage] = useState(0)
    const [index, setIndex] = useState(0)
    
    const determineHintType = () => {
      if (hintType === "Victim") {
        return victimsBoxCombination[comboIndex]
      } else {        
        return escapeBoxCombination[comboIndex]
      }
    }

    const determineHintLocation = () => {
      let location = Math.floor(Math.random() * 3)
      switch (location) {
        case 0:
          return (
            <>
              {determineDate(determineHintType())}
            {determineMessage(Math.floor(Math.random()* 10))}
            {determineIndex()}
            </>
          )
        case 1:
          return (
            <>
              {determineDate(Math.floor(Math.random()* 10))}
            {determineMessage(determineHintType())}
            {determineIndex()}
            </>
          )
        default:
          return (
            <>
              {determineDate(Math.floor(Math.random()* 10))}
            {determineMessage(Math.floor(Math.random()* 10))}
            {determineHintType()}
            </>
          )
      }
    }

    const determineDate = () => {
      switch (determineHintType()) {
        case 1:
          return "January 6th, 1974"
        case 2:
          return"February 14th, 1974"
        case 3:
          return"March 6th, 1974"
        case 4:
          return"April 6th, 1974"
        case 5:
          return"May 6th, 1974"
        case 6:
          return"June 4th, 1974"
        case 7:
          return"July 4th, 1974"
        case 8:
          return"August 2nd, 1974"
        case 9:
          return"September 11th, 1974"
        default:
          return"October 31st, 1974"
      }
    }

    const determineMessage = () => {
      switch (determineHintType()) {
        case 1:
          return "Today, I started a new path. My first kill... it was glorious! He never even saw me coming, the poor fool."
        case 2:
          return"Valentine's day; how quaint! Nothing says romance like two people, gasping for breath, and begging for their lives..."
        case 3:
          return"The luck of the Irish, indeed! I was lucky enough to spot a fellow, blissfully dancing along the railroad tracks. No one told him that the third rail was electrified..."
        case 4:
          return`"April fools, right?" That's what my latest victim kept asking`
        case 5:
          return"The"
        case 6:
          return"June 4th, 1974"
        case 7:
          return"July 4th, 1974"
        case 8:
          return"August 2nd, 1974"
        case 9:
          return"September 11th, 1974"
        case 0:
          return"October 31st, 1974"
      }
    }

    const determineIndex = () => {
      let randomIndex = Math.floor(Math.random() * 4)
      return randomIndex + 1
    }

    return (
      <>
      <h1>Hint #{comboIndex + 1}</h1>
        <p>{determineDate()}</p>
        <p>{determineMessage()}</p>
        <button onClick={() => setDisplayArraySelection(0)}>Back</button>
      </>
    );
  };

export default Hint;