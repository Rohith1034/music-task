import { memo, useEffect, useRef, useState } from "react"
import styles from "./MusicLibrary.module.css"
import FilterComp from "./Components/FIlterComp/FilterComp"
import AddMusic from "./Components/AddMusic/AddMusic"
import GenericBtn from "./Components/GenericBtn/GenericBtn"
import { Bounce, ToastContainer, toast } from "react-toastify"

export type sortByType = "title" | "artist" | "album"
export type songType = {
  title: string
  artist: string
  album: string
  imageUrl: string
}

export type filterType = { artist: string[]; album: string[] }

const MusicLibrary = ({ showAddSongForm, userRole }: { showAddSongForm: boolean; userRole: "admin" | "user" }) => {
  const notify = (msg: string, type: "error" | "success") => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    })
  }

  const [songs, setSongs] = useState<songType[] | []>([])
  const [songList, setSongList] = useState(songs)

  // useRef
  const createRef = useRef<HTMLDivElement>(null)

  // Adding songs to the list
  const handleAdd = (song: songType) => {
    if (!song.title || !song.artist || !song.album || !song.imageUrl) {
      notify("Please fill all the fields", "error")
      return false
    } else {
      localStorage.setItem("songs", JSON.stringify([...songs, song]))
      notify("Added successfully", "success")
      setSongs([...songs, song])
      return true
    }
  }

  // Sorting songs
  const handleSort = (sortBy: sortByType) => {
    const newVal = [...songList]?.sort((a: songType, b: songType) => a[sortBy].localeCompare(b[sortBy], undefined, { sensitivity: "base" }))
    setSongList(newVal)
  }

  // Filtering songs
  const handleFilter = (filterVal: filterType) => {
    if (filterVal?.album?.length === 0 && filterVal?.artist?.length === 0) {
      setSongList(songs)
    } else {
      const filteredSongs = songs?.filter((song: songType) => filterVal?.artist?.includes(song?.artist) || filterVal?.album?.includes(song?.album))
      setSongList(filteredSongs)
    }
  }

  // Removing songs from the list
  const removeSong = (song: songType) => {
    const filteredSongs = songs?.filter((val: songType) => val.title !== song.title)
    setSongs(filteredSongs)
    localStorage.setItem("songs", JSON.stringify(filteredSongs))
    notify(`Deleted ${song?.title} successfully`, "success")
  }

  // Getting songs from local storage
  const getSongsFromLocal = () => {
    const songsInLocal = localStorage.getItem("songs")
    if (songsInLocal) {
      setSongs(JSON.parse(songsInLocal))
    }
  }

  useEffect(() => {
    getSongsFromLocal()
  }, [])

  useEffect(() => {
    setSongList(songs)
  }, [songs])

  return (
    <div className="container">
      <ToastContainer />
      {showAddSongForm ? (
        <div>
          <AddMusic handleAdd={handleAdd} />
        </div>
      ) : (
        ""
      )}
      <FilterComp songs={songs} handleSort={handleSort} handleFilter={handleFilter} />
      <div className="row">
        {songList?.length > 0 ? (
          songList?.map((song: songType, index: number) => {
            return (
              <div key={index} className={`${styles.listMain} p-3 col-md-3 col-sm-6 col-xs-12`}>
                <div>
                  <img className={styles.imageTag} src={song.imageUrl} alt={`image-${index + 1}`} />
                </div>
                <div className={styles.title} data-testid="title">
                  {song.title}
                </div>
                <div data-testid={`artist${index}`} className={styles.artist}>
                  by {song.artist}
                </div>
                <div className={styles.album} data-testid="album">
                  {song.album}
                </div>
                {userRole === "admin" ? (
                  <div className={styles.deleteBtn}>
                    <GenericBtn
                      title="Delete"
                      backgColor="red"
                      padding="3px 8px"
                      fontsize="14px"
                      handleClick={() => {
                        removeSong(song)
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            )
          })
        ) : (
          <div className={styles.noSongs}>No songs found</div>
        )}
      </div>
    </div>
  )
}

export default memo(MusicLibrary)
