import { useContext, useEffect, useState } from "react";
import AbandonedCabin from "./AbandonedCabin/AbandonedCabin";
import DarkCastle from "./DarkCastle/DarkCastle";
import DeepOcean from "./DeepOcean/DeepOcean";
import OfficeNoir from "./OfficeNoir/OfficeNoir";
import { RoomContext } from "../../context/RoomProvider";
import AudioProvider from '../../context/AudioProvider'
import InGameMenu from "./InGameMenu";
import { useNavigate } from "react-router-dom";
import "./InGame.css";
import CabinProvider from "./AbandonedCabin/CabinContext";

const InGameNav = () => {
  const { currentRoom, currentTime, setCurrentTime } = useContext(RoomContext);
  const { name, timeLimit } = currentRoom;
  const [timer, setTimer] = useState(timeLimit);
  const navigate = useNavigate();

  const roomSelector = () => {
    switch (name.toLowerCase()) {
      case "abandoned cabin":
        return (
          <CabinProvider>
            <AbandonedCabin
              victory={victoryFunction}
              gameOver={gameOverFunction}
            />
          </CabinProvider>
        );
      case "dark castle":
        return (
          <DarkCastle victory={victoryFunction} gameOver={gameOverFunction} />
        );
      case "deep ocean":
        return (
          <DeepOcean victory={victoryFunction} gameOver={gameOverFunction} />
        );
      case "office noir":
        return (
          <OfficeNoir victory={victoryFunction} gameOver={gameOverFunction} />
        );
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
      return "Invalid time";
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "00";
    const minutesText = minutes > 0 ? `${minutes}`.padStart(2, "0") : "00"; // Add leading zero if necessary
    const secondsText =
      remainingSeconds > 0 ? `${remainingSeconds}`.padStart(2, "0") : "00"; // Ensure two-digit format
    const timeArray = [hoursText, minutesText, secondsText];
    if (timeArray.length === 0) {
      return "0";
    }
    return timeArray.join(":");
  };
  const formattedTime = formatTime(timer);

  useEffect(() => {
    let interval;
    setCurrentTime(timer);
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
        setCurrentTime(timer - 1);
        //Play Tick Sound
        if (timer < 10) ""; // Play Warning Sound
        if (timer < 1) ""; // Play Warning & Danger Sound
      }, 1000);
    } else {
      // Trigger game over function here
      gameOverFunction();
    }
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [timer]);

  const gameOverFunction = () => {
    navigate("/gameover");
  };

  const victoryFunction = () => {
    navigate("/victory");
  };

  return (
    <div className="inGame">
      <h1>{name}</h1>
      <AudioProvider>{roomSelector()}</AudioProvider>
      <p className={currentTime > 10 ? "timer" : "timerEnd"}>{formattedTime}</p>
    </div>
  );
};

export default InGameNav;
