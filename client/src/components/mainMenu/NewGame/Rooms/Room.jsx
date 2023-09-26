import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserProvider";
import { RoomContext } from "../../../../context/RoomProvider";
import { useNavigate } from "react-router-dom";

const Room = (props) => {
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
  const { currentRoom } = useContext(RoomContext);
  const navigate = useNavigate()

  const startGame = () => {
    navigate("/ingame")
  };

  return (
    <div>
      {toggle ? (
        <div className="room">
          <h1>{currentRoom.name}</h1>
          <img
            src={currentRoom.image}
            alt={currentRoom.name}
            className="roomImg"
          />
          <div className="roomDescriptionBox" >
            <h2 className="roomDescription" style={{ animation: `scroll ${currentRoom.description.length / 10}s linear infinite` }}>
              {currentRoom.description}
              </h2>
            </div>
          <div className="roomMenuButtonContainer">
            <button className="roomMenuButton" onClick={startGame}>
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className="room" onClick={() => handleRoomSelection(props)}>
          <h1>{name}</h1>
          <img src={image} alt={name} className="roomImg" />
        </div>
      )}
    </div>
  );
};

export default Room;
