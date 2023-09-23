import React, {useContext, useEffect, useState, } from 'react'
import axios from 'axios'
import { UserContext } from './UserProvider'

export const GameContext = React.createContext()

const GameProvider = (props) => {
    const {
      userState,
      setUserState,
      playthroughs,
      token
    } = useContext(UserContext)
    const gameAxios = axios.create()

    gameAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        playthrough: playthroughs[0],
        errMsg: ""
    }
    const[localStorageSet, setLocalStorageSet] = useState(false)
    const [currentRoom, setCurrentRoom] = useState(initState)

  
    useEffect(() => {
      const storedPlaythrough = JSON.parse(localStorage.getItem('currentRoom'));
  
      if (storedPlaythrough) {
        setCurrentRoom(storedPlaythrough);
      }
    }, []);
  
    useEffect(() => {
      // Save currentRoom to local storage
      localStorage.setItem('currentRoom', JSON.stringify(currentRoom));
    }, [currentRoom]);

    const cleanState = () => {
      setCurrentRoom({
        _id: null,
        date: null,
        location: null,
        time: null
      })
    }

    const addPlaythrough = (newPlaythrough) => {
      gameAxios.post("/api/playthroughs", newPlaythrough)
        .then(res => {
          setUserState(prevState => ({
              ...prevState,
              playthroughs: [...prevState.playthroughs, res.data]
          }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getUserPlaythroughs = () => {
      gameAxios.get('/api/playthroughs/user')
        .then(res => {
          setUserState(prevState => ({
            ...prevState,
            playthroughs: res.data
          }))
          setCurrentRoom(prevState => ({
            ...prevState
          }))
          localStorage.setItem("playthroughs", JSON.stringify(res.data))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getUserPlaythroughsByRoom = () => {
        gameAxios.get('/api/playthroughs/user/:roomId')
          .then(res => {
            setUserState(prevState => ({
              ...prevState,
              playthroughs: res.data
            }))
            setCurrentRoom(prevState => ({
              ...prevState
            }))
            localStorage.setItem("playthroughs", JSON.stringify(res.data))
          })
          .catch(err => console.log(err.response.data.errMsg))
      }

    const getOnePlaythrough = (roomId) => {
        gameAxios.get(`/api/playthroughs/${roomId}`)
        .then(res => {
        setCurrentRoom(res.data)
      })
      .catch(err => console.log(err.response.data.errMsg))
    }
    
    const editPlaythrough = (updates, roomId) => {
      gameAxios.put(`/api/playthroughs/${roomId}`, updates,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          getUserPlaythroughs()
          setUserState(playthrough => playthrough._id !== roomId ? playthrough : res.data)
      })
      .catch(err => console.log(err));
    };

      const deleteRoom = (roomId) => {
        gameAxios.delete(`/api/playthroughs/${roomId}`, 
          {
            headers: {
              'Authorization': `Bearer ${initState.token}`
            }
          }
        )
          .then(res => {
            const updatedRooms = playthroughs.filter(playthrough => playthrough._id !== roomId);
            setUserState(prevState => ({
              ...prevState,
              playthroughs: updatedRooms
            }))
            localStorage.setItem("playthroughs", JSON.stringify(updatedRooms))
          })
          .catch(err => console.log(err))
      }
      
    return (
        <GameContext.Provider
            value={{
                cleanState,
                playthroughs,
                currentRoom,
                currentTime,
                setCurrentTime,
                addPlaythrough,
                getUserPlaythroughs,
                getUserPlaythroughsByRoom,
                getOnePlaythrough,
                editPlaythrough,
                deleteRoom,
                setCurrentRoom
            }}
        >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameProvider