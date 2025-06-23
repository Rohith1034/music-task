import React, { useState } from "react"
import styles from "./AddMusic.module.css"
import GenericBtn from "../GenericBtn/GenericBtn"
import type { songType } from "../../MusicLibrary"

interface AddMusicProps {
  handleAdd: (song: songType) => boolean
}

function AddMusic({ handleAdd }: AddMusicProps) {
  // State to manage song details
  const [songDetails, setSongDetails] = useState<songType>({ title: "", artist: "", album: "", imageUrl: "" })

  //Handling input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSongDetails(prevVal => ({ ...prevVal, [name]: value }))
  }

  //Calling the add song function from the parent component
  const addSong = () => {
    const res: boolean = handleAdd(songDetails)
    if (res) {
      setSongDetails({ title: "", artist: "", album: "", imageUrl: "" })
    }
  }

  return (
    <div className={`${styles.container} container`}>
      <div className={styles.form}>
        <div className={styles.subDiv}>
          <div>
            <div className={styles.inputLabel}>Title</div>
            <input className={styles.input} type="text" data-testid="title-input" name="title" value={songDetails.title || ""} onChange={e => handleChange(e)} />
          </div>
          <div>
            <div className={styles.inputLabel}>Artist</div>
            <input className={styles.input} type="text" data-testid="artist-input" name="artist" value={songDetails.artist || ""} onChange={e => handleChange(e)} />
          </div>
        </div>
        <div className={styles.subDiv}>
          <div>
            <div className={styles.inputLabel}>Album</div>
            <input className={styles.input} type="text" data-testid="album-input" name="album" value={songDetails.album || ""} onChange={e => handleChange(e)} />
          </div>
          <div>
            <div className={styles.inputLabel}>Image Url</div>
            <input className={styles.input} type="text" data-testid="imageUrl-input" name="imageUrl" value={songDetails.imageUrl || ""} onChange={e => handleChange(e)} />
          </div>
        </div>
        <div className={styles.btnGrp}>
          <GenericBtn
            title="Add"
            backgColor="black"
            height="28px"
            padding="0px 15px"
            handleClick={() => {
              addSong()
            }}
          />
          <GenericBtn
            title="Cancel"
            backgColor="red"
            height="28px"
            padding="0px 15px"
            handleClick={() => {
              const event = new CustomEvent("closeAddSong")
              dispatchEvent(event)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default AddMusic
