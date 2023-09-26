import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Login/Auth/Auth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { UserContext } from "./context/UserProvider.jsx";
import MainMenu from "./components/mainMenu/MainMenu.jsx";
import MainMenuNav from "./components/mainMenu/MainMenuNav.jsx";
import PlaythroughProvider from "./context/PlaythroughProvider.jsx";
import RoomProvider from "./context/RoomProvider.jsx";
import InGameNav from "./components/InGame/InGameNav.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import Victory from "./components/Victory/Victory.jsx";

const App = () => {
  const { token } = useContext(UserContext);
  return (
    <div className="app">
      <RoomProvider>
        <PlaythroughProvider>
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="/mainmenu" /> : <Auth />}
            />
            <Route
              path="/mainmenu"
              element={
                <ProtectedRoute token={token} redirectTo="/">
                  <MainMenuNav />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ingame"
              element={
                <ProtectedRoute token={token} redirectTo="/">
                  <InGameNav />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gameover"
              element={
                <ProtectedRoute token={token} redirectTo="/">
                  <GameOver />
                </ProtectedRoute>
              }
            />
            <Route
              path="/victory"
              element={
                <ProtectedRoute token={token} redirectTo="/">
                  <Victory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </PlaythroughProvider>
      </RoomProvider>
    </div>
  );
};

export default App;
