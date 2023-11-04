import { useContext, useState } from "react";
import { RoomContext } from "../../context/RoomProvider";

const InGameMenu = (props) => {
  const { gameOver } = props;
  const { currentRoom } = useContext(RoomContext);
  const { name, objectives } = currentRoom;
  const [exitToggled, setExitToggled] = useState(false);

  const mappedObjectives = objectives?.map((goal) => {
    const [completed, setCompleted] = useState(goal.completed);
    return (
      <div key={goal.title}>
        <h2
          style={{
            color: completed ? "#00e600" : "white",
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {goal.title}
        </h2>
      </div>
    );
  });

  return (
    <div className="inGameMenu">
      {exitToggled ? (
        <div className="exitMenu">
          <h1 className="exitWarning">THERE'S STILL TIME!</h1>
          <h2>ARE YOU SURE?</h2>
          <button onClick={gameOver} className="exitWarningButton">
            Exit
          </button>
        </div>
      ) : (
        <>
          <div className="objectives">
            Objectives:
            {mappedObjectives}
          </div>
          <button className="objectivesButton" onClick={() => setExitToggled(!exitToggled)}>Exit</button>
        </>
      )}
    </div>
  );
};

export default InGameMenu;
