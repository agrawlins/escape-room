import { useContext, useState } from "react";
import { RoomContext } from "../../context/RoomProvider";

const InGameMenu = (props) => {
  const { currentRoom, } = useContext(RoomContext);
  const { name, objectives } = currentRoom;

  const mappedObjectives = objectives?.map(goal => {
    const [completed, setCompleted] = useState(goal.completed)
    return (
      <div key={goal.title}>
        <h2 style={{ color: completed ? "#00e600" : "white" }}>
          {goal.title}
        </h2>
      </div>
    );
  })

  return (
    <div className="inGameMenu">
      Objectives:
      {mappedObjectives}
    </div>
  );
};

export default InGameMenu;
