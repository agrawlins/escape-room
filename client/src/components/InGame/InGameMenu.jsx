import { useContext, useState } from "react";
import { RoomContext } from "../../context/RoomProvider";

const InGameMenu = (props) => {
  const { currentRoom } = useContext(RoomContext);
  const { name, objectives } = currentRoom;

  const mappedObjectives = objectives.map((goal) => {
    const [goalCompleted, setGoalCompleted] = useState(goal.completed);
    return (
      <>
        <h2 style={{ color: goalCompleted ? "#00e600" : "white" }}>
          {goal.title}
        </h2>
      </>
    );
  });

  return (
    <div className="inGameMenu">
      Objectives:
      {mappedObjectives}
    </div>
  );
};

export default InGameMenu;
