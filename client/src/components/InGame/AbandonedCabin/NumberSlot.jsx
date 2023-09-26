const NumberSlot = (props) => {
    const {lockboxNum, setLockboxNum} = props

    const moveNumUp = () => {
        if (lockboxNum === 9) {
            setLockboxNum(0)
        } else {            
            setLockboxNum(lockboxNum + 1)
        }
      }

    const moveNumDown = () => {
        if (lockboxNum === 0) {
            setLockboxNum(9)
        } else {     
            setLockboxNum(lockboxNum - 1)
        }
      }

  return (
    <div className="numberSlot">
      <button className="upBtn" onClick={moveNumUp}>^</button>
      <div className="numberDisplay">{lockboxNum}</div>
      <button className="dnBtn" onClick={moveNumDown}>^</button>
    </div>
  );
};

export default NumberSlot