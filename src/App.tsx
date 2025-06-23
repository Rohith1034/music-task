import MusicLibrary from "./MusicLibrary"

function App() {
  return (
    <>
      <MusicLibrary showAddSongForm={true} userRole="admin" />
    </>
  )
}

export default App
