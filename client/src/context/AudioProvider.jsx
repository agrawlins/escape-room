import {createContext, useContext, useEffect, useState, } from 'react'
import generalSoundEffects from '../datasets/sounds/effects/general/generalSoundEffects'
import { RoomContext } from './RoomProvider'


export const AudioContext = createContext()

const AudioProvider = (props) => {
    const { currentRoom, currentTime } = useContext(RoomContext);
    const [currentSFXIndex, setCurrentSFXIndex] = useState("tick");
    const [sfxTrigger, setSFXTrigger] = useState(false)
    const [sfxVolume, setSFXVolume] = useState(1);
    const [sfxPlayer, setSFXPlayer] = useState("");



    useEffect(() => {
        if (currentTime <= 11 && currentTime > 1) {
            changeSFX("warning")
        } else if (currentTime <= 0) {
            changeSFX("lock")
        } else {
            currentTime % 2 === 0 ? changeSFX("tick") : changeSFX("tock")
        }
    }, [currentTime])

    const changeSFX = (name) => {
        setCurrentSFXIndex(name)
        setSFXTrigger(!sfxTrigger)
        const newSFXPlayer = new Audio(generalSoundEffects[currentSFXIndex])
        newSFXPlayer.volume = sfxVolume;
        newSFXPlayer.play();
    }
    return (
        <AudioContext.Provider value={{
            changeSFX,
            setCurrentSFXIndex,
            setSFXPlayer,
            setSFXTrigger,
            setSFXVolume
            }}>
            {props.children}
        </AudioContext.Provider>
      )
}

export default AudioProvider