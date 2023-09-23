import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../../../context/RoomProvider";
import ScoreCard from "./ScoreCard";

const HSRoom = (props) => {
  const {
    _id,
    name,
    image,
    description,
    toggle,
    setToggle,
    handleRoomSelection,
    handleRoomDeselection,
  } = props;
  const { currentRoom, currentHighScores, setCurrentHighScores } = useContext(RoomContext);

  return (
    <div>
      {toggle ? (
        <div className="hsRoom">
          <div className="hsRoomHeader">
            <h1>{currentRoom.name}</h1>
            <img
              src={currentRoom.image}
              alt={currentRoom.name}
              className="hsRoomImg"
            />
          </div>
          <div className="scoreCardList">
            {currentHighScores?.map((score) => (
              <ScoreCard {...score} key={score?._id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="hsRoom" onClick={() => handleRoomSelection(props)}>
          <h1>{name}</h1>
          <img src={image} alt={name} className="hsRoomImg" />
        </div>
      )}
    </div>
  );
};

export default HSRoom;
