import React, { useCallback, useContext, useEffect, useState } from "react";
import Room from "./Room.jsx";
import { RoomContext } from "../../../../context/RoomProvider.jsx";

const RoomList = (props, { setMenuIndexer }) => {
  const { rooms, toggle, setToggle } = props;
  const { currentRoom, setCurrentRoom } = useContext(RoomContext);

  const handleRoomSelection = (selectedRoom) => {
    setCurrentRoom(selectedRoom);
    setToggle(!toggle);
  };

  const handleRoomDeselection = () => {
    setCurrentRoom({});
    setCurrentHighScores([])
    setToggle(!toggle);
  };
  

  return (
    <div className="roomList">
      {toggle ? (
        <Room
          toggle={toggle}
          currentRoom={currentRoom}
          handleRoomDeselection={handleRoomDeselection}
        />
      ) : (
        <div>
          {rooms?.map((room) => (
            <Room
              {...room}
              key={room?._id}
              toggle={toggle}
              handleRoomSelection={() => handleRoomSelection(room)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
