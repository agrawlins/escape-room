import React, {useContext, useEffect, useState, } from 'react'
import axios from 'axios'
import { UserContext } from './UserProvider'

export const PlaythroughContext = React.createContext()

const PlaythroughProvider = (props) => {
    const {
      userState,
      setUserState,
      playthroughs,
      token
    } = useContext(UserContext)
    const playthroughAxios = axios.create()

    playthroughAxios.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        errMsg: ""
    }
    const [currentPlaythrough, setCurrentPlaythrough] = useState(initState)

  
    useEffect(() => {
      const storedPlaythrough = JSON.parse(localStorage.getItem('currentPlaythrough'));
  
      if (storedPlaythrough) {
        setCurrentPlaythrough(storedPlaythrough);
      }
    }, []);
  
    useEffect(() => {
      // Save currentPlaythrough to local storage
      localStorage.setItem('currentPlaythrough', JSON.stringify(currentPlaythrough));
    }, [currentPlaythrough]);

    const cleanState = () => {
      setCurrentPlaythrough({
        _id: null,
        date: null,
        location: null,
        time: null
      })
    }

    const getOnePlaythrough = (roomId) => {
      playthroughAxios.get(`/api/playthroughs/${roomId}`)
      .then(res => {
      setCurrentRoom(res.data)
    })
    .catch(err => console.log(err.response.data.errMsg))
  }

    const getUserPlaythroughsByRoom = () => {
      playthroughAxios.get('/api/playthroughs/user/:roomId')
        .then(res => {
          setCurrentRoom(prevState => ({
            ...prevState,
            playthroughs: res.data
          }))
          localStorage.setItem("rooms", JSON.stringify(res.data))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const addPlaythrough = (newPlaythrough) => {
      playthroughAxios.post("/api/playthroughs", newPlaythrough)
        .then(res => {
          setUserState(prevState => ({
              ...prevState,
              playthroughs: [...prevState.playthroughs, res.data]
          }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getUserPlaythroughs= () => {
      playthroughAxios.get('/api/playthroughs/user')
        .then(res => {
          setUserState(prevState => ({
            ...prevState,
            playthroughs: res.data
          }))
          setCurrentPlaythrough(prevState => ({
            ...prevState
          }))
          localStorage.setItem("playthroughs", JSON.stringify(res.data))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    // const editPlaythrough = (updates, playthroughId) => {
    //   playthroughAxios.put(`/api/playthroughs/${playthroughId}`, updates,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     })
    //     .then(res => {
    //       getUserPlaythroughs()
    //       setUserState(playthrough => playthrough._id !== playthroughId ? playthrough : res.data)
    //   })
    //   .catch(err => console.log(err));
    // };

    //   const deletePlaythrough = (playthroughId) => {
    //     playthroughAxios.delete(`/api/playthroughs/${playthroughId}`, 
    //       {
    //         headers: {
    //           'Authorization': `Bearer ${initState.token}`
    //         }
    //       }
    //     )
    //       .then(res => {
    //         const updatedPlaythroughs = playthroughs.filter(playthrough => playthrough._id !== playthroughId);
    //         setUserState(prevState => ({
    //           ...prevState,
    //           playthroughs: updatedPlaythroughs
    //         }))
    //         localStorage.setItem("playthroughs", JSON.stringify(updatedPlaythroughs))
    //       })
    //       .catch(err => console.log(err))
    //   }
      
    return (
        <PlaythroughContext.Provider
            value={{
                cleanState,
                playthroughs,
                currentPlaythrough,
                addPlaythrough,
                getUserPlaythroughs,
                getOnePlaythrough,
                getUserPlaythroughsByRoom,
                // editPlaythrough,
                // deletePlaythrough,
                setCurrentPlaythrough
            }}
        >
            {props.children}
        </PlaythroughContext.Provider>
    )
}

export default PlaythroughProvider