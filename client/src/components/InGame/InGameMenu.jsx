import { useContext } from "react";
import { RoomContext } from "../../context/RoomProvider";

const InGameMenu = () => {
  const { currentRoom } = useContext(RoomContext);
  const { name, objectives } = currentRoom;

  const mappedObjectives = objectives.map((goal) => (
    <h2 style={{ color: goal.completed ? "#00e600" : "none" }}>
      {goal.title}
    </h2>
  ));

  return (
    <div className="inGameMenu">
      Objectives:
      {mappedObjectives}
    </div>
  );
};

export default InGameMenu;
