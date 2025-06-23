import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import AddMusic from "./AddMusic"

describe("AddMusic Component", () => {
  const mockHandleAdd = vi.fn()

  it("should render input fields and buttons", () => {
    render(<AddMusic handleAdd={mockHandleAdd} />)

    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Artist")).toBeInTheDocument()
    expect(screen.getByText("Album")).toBeInTheDocument()
    expect(screen.getByText("Image Url")).toBeInTheDocument()
    expect(screen.getByText("Add")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
  })

  it("should update input values on change", () => {
    render(<AddMusic handleAdd={mockHandleAdd} />)

    const titleInput = screen.getByTestId("title-input")
    fireEvent.change(titleInput, { target: { value: "New Song" } })
    expect(titleInput).toHaveValue("New Song")

    const artistInput = screen.getByTestId("artist-input")
    fireEvent.change(artistInput, { target: { value: "New Artist" } })
    expect(artistInput).toHaveValue("New Artist")

    const albumInput = screen.getByTestId("album-input")
    fireEvent.change(albumInput, { target: { value: "New Album" } })
    expect(albumInput).toHaveValue("New Album")

    const imageUrlInput = screen.getByTestId("imageUrl-input")
    fireEvent.change(imageUrlInput, { target: { value: "http://example.com/image.jpg" } })
    expect(imageUrlInput).toHaveValue("http://example.com/image.jpg")
  })

  it("should call handleAdd with correct data when Add button is clicked", () => {
    render(<AddMusic handleAdd={mockHandleAdd} />)

    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "New Song" } })
    fireEvent.change(screen.getByTestId("artist-input"), { target: { value: "New Artist" } })
    fireEvent.change(screen.getByTestId("album-input"), { target: { value: "New Album" } })
    fireEvent.change(screen.getByTestId("imageUrl-input"), { target: { value: "http://example.com/image.jpg" } })

    fireEvent.click(screen.getByText("Add"))

    expect(mockHandleAdd).toHaveBeenCalledWith({
      title: "New Song",
      artist: "New Artist",
      album: "New Album",
      imageUrl: "http://example.com/image.jpg"
    })
  })

  it("should reset input fields after adding a song", () => {
    mockHandleAdd.mockReturnValue(true)
    render(<AddMusic handleAdd={mockHandleAdd} />)

    fireEvent.change(screen.getByTestId("title-input"), { target: { value: "New Song" } })
    fireEvent.change(screen.getByTestId("artist-input"), { target: { value: "New Artist" } })
    fireEvent.change(screen.getByTestId("album-input"), { target: { value: "New Album" } })
    fireEvent.change(screen.getByTestId("imageUrl-input"), { target: { value: "http://example.com/image.jpg" } })

    fireEvent.click(screen.getByText("Add"))

    expect(screen.getByTestId("title-input")).toHaveValue("")
    expect(screen.getByTestId("artist-input")).toHaveValue("")
    expect(screen.getByTestId("album-input")).toHaveValue("")
    expect(screen.getByTestId("imageUrl-input")).toHaveValue("")
  })

  it("should dispatch a closeAddSong event when Cancel button is clicked", () => {
    const mockDispatchEvent = vi.spyOn(window, "dispatchEvent")
    render(<AddMusic handleAdd={mockHandleAdd} />)

    fireEvent.click(screen.getByText("Cancel"))

    expect(mockDispatchEvent).toHaveBeenCalledWith(new CustomEvent("closeAddSong"))
  })

  it("should render input fields and allow user input", () => {
    render(<AddMusic handleAdd={mockHandleAdd} />)

    const titleInput = screen.getByTestId("title-input")
    fireEvent.change(titleInput, { target: { value: "Test Title" } })
    expect(titleInput).toHaveValue("Test Title")

    const artistInput = screen.getByTestId("artist-input")
    fireEvent.change(artistInput, { target: { value: "Test Artist" } })
    expect(artistInput).toHaveValue("Test Artist")

    const albumInput = screen.getByTestId("album-input")
    fireEvent.change(albumInput, { target: { value: "Test Album" } })
    expect(albumInput).toHaveValue("Test Album")

    const imageUrlInput = screen.getByTestId("imageUrl-input")
    fireEvent.change(imageUrlInput, { target: { value: "http://example.com/test.jpg" } })
    expect(imageUrlInput).toHaveValue("http://example.com/test.jpg")
  })
})
