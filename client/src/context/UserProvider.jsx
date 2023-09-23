import React, {useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProvider = (props) => {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {}, 
        token: localStorage.getItem("token") || "", 
        playthroughs: [],
        errMsg: ""
    }
    const [userState, setUserState] = useState(initState)
    const [inGame, setInGame] = useState(false)
    // const [colorScheme, setColorScheme] = useState("slate")

    const signup = (credentials) => {
        axios.post("/auth/signup", credentials)
        .then(res => {
            const {user, token} = res.data
            console.log(user, token)
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const login = (credentials) => {
        axios.post("/auth/login", credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('characters')
        localStorage.removeItem('character')
        setUserState({
            user: {},
            token: "",
            characters: []
        })
    }

    const handleAuthErr = (errMsg) => {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    const resetAuthErr = () => {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    const getUserInfo = (_id) => {
        roomAxios
        .get(`/api/playthroughs/${_id}`)
        .then((res) => {
          setCurrentHighScores(res.data);
        })
        .catch((err) => console.log(err.response.data.errMsg));
    };screenLeft

    return (
        <UserContext.Provider
            value={{
                ...userState,
                inGame,
                setInGame,
                setUserState,
                signup,
                login,
                logout,
                resetAuthErr  
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider