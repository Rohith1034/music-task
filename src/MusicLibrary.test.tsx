import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import MusicLibrary from "./MusicLibrary"
import { Bounce, toast } from "react-toastify"

vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify") // Import the actual module
  return {
    ...actual, // Spread the actual exports
    toast: {
      success: vi.fn(),
      error: vi.fn()
    },
    ToastContainer: () => <div data-testid="toast-container" /> // Mock ToastContainer
  }
})

describe("Music Library page test", () => {
  const mockSongs = [
    { artist: "Artist1", album: "Album1", title: "Song1", imageUrl: "url1" },
    { artist: "Artist2", album: "Album2", title: "Song2", imageUrl: "url2" },
    { artist: "Artist1", album: "Album3", title: "Song3", imageUrl: "url3" }
  ]

  beforeEach(() => {
    localStorage.setItem("songs", JSON.stringify(mockSongs))
  })

  afterEach(() => {
    localStorage.clear()
  })

  it("Should render all the songs", () => {
    render(<MusicLibrary showAddSongForm={false} userRole="user" />)

    mockSongs.forEach((song, index) => {
      expect(screen.getByText(song.title)).toBeInTheDocument()
      const artistdiv = screen.getByTestId(`artist` + index)
      expect(artistdiv).toBeInTheDocument()
      expect(artistdiv).toHaveTextContent(song.artist)
      expect(screen.getByText(song.album)).toBeInTheDocument()
    })
  })

  it("Should allow admin to delete a song", () => {
    render(<MusicLibrary showAddSongForm={false} userRole="admin" />)

    const deleteButton = screen.getAllByText("Delete")[0]
    fireEvent.click(deleteButton)
    expect(toast.success).toHaveBeenCalledWith(`Deleted ${mockSongs[0].title} successfully`, {
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

    const remainingSongs = mockSongs.slice(1)
    remainingSongs.forEach(song => {
      expect(screen.getByText(song.title)).toBeInTheDocument()
    })

    expect(screen.queryByText(mockSongs[0].title)).not.toBeInTheDocument()
  })

  it("SHould display no songs found when there are no songs", () => {
    localStorage.setItem("songs", JSON.stringify([]))
    render(<MusicLibrary showAddSongForm={false} userRole="user" />)

    expect(screen.getByText("No songs found")).toBeInTheDocument()
  })

  it("should display an error notification when required fields are missing", () => {
    render(<MusicLibrary showAddSongForm={true} userRole="admin" />)

    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "" } }) // Leave title empty
    fireEvent.change(screen.getByTestId("artist-input"), { target: { value: "New Artist" } })
    fireEvent.change(screen.getByTestId("album-input"), { target: { value: "New Album" } })
    fireEvent.change(screen.getByTestId("imageUrl-input"), { target: { value: "http://example.com/image.jpg" } })

    fireEvent.click(screen.getByText("Add"))

    expect(toast.error).toHaveBeenCalledWith("Please fill all the fields", {
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
  })

  it("should display a success notification when a song is added successfully", () => {
    render(<MusicLibrary showAddSongForm={true} userRole="admin" />)

    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "New Song" } })
    fireEvent.change(screen.getByTestId("artist-input"), { target: { value: "New Artist" } })
    fireEvent.change(screen.getByTestId("album-input"), { target: { value: "New Album" } })
    fireEvent.change(screen.getByTestId("imageUrl-input"), { target: { value: "http://example.com/image.jpg" } })

    fireEvent.click(screen.getByText("Add"))

    expect(toast.success).toHaveBeenCalledWith("Added successfully", {
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
  })
})
