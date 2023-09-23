import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import "./MainMenu.css"

const MainMenu = ({ setMenuIndexer }) => {
  const { logout } = useContext(UserContext);

  return (
    <div className="mainMenu">
      <h1>ESCAPE!</h1>
      <>
      <button className="menuButton" onClick={() => setMenuIndexer(1)}>New Game</button>
      <button className="menuButton" onClick={() => setMenuIndexer(2)}>High Scores</button>
      <button className="menuButton" onClick={() => setMenuIndexer(3)}>Profile</button>
      <button className="menuButton" onClick={logout}>Exit</button>
      </>
    </div>
  );
};

export default MainMenu;
