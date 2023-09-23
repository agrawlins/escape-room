import React, { useCallback, useContext, useEffect, useState } from "react";
import HSRoom from "./HSRoom.jsx";
import { RoomContext } from "../../../../context/RoomProvider.jsx";

const HSRoomList = (props, { setMenuIndexer }) => {
  const { rooms, toggle, setToggle } = props;
  const { currentRoom, setCurrentRoom, currentHighScores, setCurrentHighScores, getRoomPlaythroughs } = useContext(RoomContext);

  const handleRoomSelection = (selectedRoom) => {
    setCurrentRoom(selectedRoom);
    getRoomPlaythroughs(selectedRoom._id)
    setToggle(!toggle);
  };

  const handleRoomDeselection = () => {
    setCurrentRoom({});
    setCurrentHighScores([])
    setToggle(!toggle);
  };

  return (
    <div>
      {toggle ? (
        <HSRoom
          toggle={toggle}
          currentRoom={currentRoom}
          currentHighScores={currentHighScores}
          handleRoomDeselection={handleRoomDeselection}
        />
      ) : (
        <div className="hsRoomList">
          {rooms?.map((room) => (
            <HSRoom
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

export default HSRoomList;
