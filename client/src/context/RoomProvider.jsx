import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserProvider";

export const RoomContext = React.createContext();

const RoomProvider = (props) => {
  const { userState, setUserState, playthroughs, token } =
    useContext(UserContext);
  const roomAxios = axios.create();

  roomAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    errMsg: "",
  };

  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const [currentHighScores, setCurrentHighScores] = useState([]);
  const [currentTime, setCurrentTime] = useState(currentRoom.time)
 

  

  const cleanState = () => {
    setCurrentRoom({
      _id: null,
      date: null,
      location: null,
      time: null,
    });
  };

  const getRooms = () => {
    roomAxios
      .get("/api/rooms")
      .then((res) => {
        setRooms(res.data);
        localStorage.setItem("rooms", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  const getRoomPlaythroughs = (_id) => {
    roomAxios
      .get(`/api/playthroughs/${_id}`)
      .then((res) => {
        setCurrentHighScores(res.data);
      })
      .catch((err) => console.log(err.response.data.errMsg));
  };

  return (
    <RoomContext.Provider
      value={{
        cleanState,
        playthroughs,
        rooms,
        currentRoom,
        currentTime,
        setCurrentTime,
        setCurrentRoom,
        getRooms,
        getRoomPlaythroughs,
        currentHighScores,
        setCurrentHighScores,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
