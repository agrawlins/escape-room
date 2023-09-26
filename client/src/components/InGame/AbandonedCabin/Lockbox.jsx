import NumberSlot from "./NumberSlot";

const Lockbox = (props) => {
  const {
    lockboxOpened,
    setLockboxOpened,
    lockboxNum1,
    setLockboxNum1,
    lockboxNum2,
    setLockboxNum2,
    lockboxNum3,
    setLockboxNum3,
    lockboxNum4,
    setLockboxNum4,
    objective,
    setObjective,
    lockboxType,
    combination,
  } = props;

  const attemptOpen = () => {
    if (
      lockboxOpened === false &&
      lockboxNum1 === combination[0] &&
      lockboxNum2 === combination[1] &&
      lockboxNum3 === combination[2] &&
      lockboxNum4 === combination[3]
    ) {
      setLockboxOpened(true);
      setObjective(true)
      alert(`The ${lockboxType} opened!`);
      alert(`You acquired a ${objective}`)
    } else if (lockboxOpened) {
      alert("There's nothing of interest left in here...");
    } else {
      alert(`The ${lockboxType} won't open...`);
    }
  };

  return (
    <div className="lockbox">
      <h1>{lockboxType}</h1>
      <div className="numberSection">
        <NumberSlot lockboxNum={lockboxNum1} setLockboxNum={setLockboxNum1} />
        <NumberSlot lockboxNum={lockboxNum2} setLockboxNum={setLockboxNum2} />
        <NumberSlot lockboxNum={lockboxNum3} setLockboxNum={setLockboxNum3} />
        <NumberSlot lockboxNum={lockboxNum4} setLockboxNum={setLockboxNum4} />
      </div>
      <button className="openBtn" onClick={attemptOpen}></button>
    </div>
  );
};

export default Lockbox;
