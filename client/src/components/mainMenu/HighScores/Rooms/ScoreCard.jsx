import React, { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../../../context/RoomProvider";

const ScoreCard = (props) => {
  const {currentRoom} = useContext(RoomContext)
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
      return "Invalid time";
    }
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const minutesText = minutes > 0 ? `${minutes}` : "0"; // Add leading zero if necessary
    const secondsText =
      remainingSeconds > 0 ? `${remainingSeconds}`.padStart(2, "0") : "00"; // Ensure two-digit format
    const timeArray = [minutesText, secondsText];
    if (timeArray.length === 0) {
      return "0 seconds";
    }
    return timeArray.join(":");
  };
  const formattedTime = formatTime(currentRoom.timeLimit - props.time);

  return (
    <div className="scoreCard">
      <h3>{props.user.username}</h3>
      {props.time > 0 ? (
        <>
          <p>Time Left:</p>
          <p>{formattedTime}</p>
        </>
      ) : (
        <h2 style={{ color: "red" }}>Failed!</h2>
      )}
    </div>
  );
};

export default ScoreCard;
