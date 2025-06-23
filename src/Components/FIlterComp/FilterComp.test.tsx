import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import FilterComp from "./FilterComp"
// import { filterType } from "../../MusicLibrary"

describe("FilterComp Component", () => {
  const mockSongs = [
    { artist: "Artist1", album: "Album1", title: "Song1", imageUrl: "url1" },
    { artist: "Artist2", album: "Album2", title: "Song2", imageUrl: "url2" },
    { artist: "Artist1", album: "Album3", title: "Song3", imageUrl: "url3" }
  ]

  const mockHandleSort = vi.fn()
  const mockHandleFilter = vi.fn()

  it("should render sort and filter options", () => {
    render(<FilterComp songs={mockSongs} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    expect(screen.getByText("Sort By")).toBeInTheDocument()
    expect(screen.getByText("Filter")).toBeInTheDocument()
  })

  it("should toggle sort options on click", async () => {
    render(<FilterComp songs={mockSongs} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    const sortByButton = screen.getByText("Sort By")
    await userEvent.click(sortByButton)

    expect(screen.getByText("Alphabetical")).toBeInTheDocument()
    expect(screen.getByText("Artist")).toBeInTheDocument()
    expect(screen.getByText("Album")).toBeInTheDocument()
  })

  it("should call handleSort when a sort option is clicked", async () => {
    render(<FilterComp songs={mockSongs} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    const sortByButton = screen.getByText("Sort By")
    await userEvent.click(sortByButton)

    const alphabeticalOption = screen.getByText("Alphabetical")
    await userEvent.click(alphabeticalOption)

    expect(mockHandleSort).toHaveBeenCalledWith("title")
  })

  it("should toggle filter options on click", async () => {
    render(<FilterComp songs={mockSongs} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    const filterButton = screen.getByText("Filter")
    await userEvent.click(filterButton)

    expect(screen.getByText("Artist")).toBeInTheDocument()
    expect(screen.getByText("Album")).toBeInTheDocument()
  })

  it("should see no artist and no album when no songs added", async () => {
    render(<FilterComp songs={[]} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    const filterButton = screen.getByText("Filter")
    await userEvent.click(filterButton)

    expect(screen.getByText("No artist")).toBeInTheDocument()
    expect(screen.getByText("No album")).toBeInTheDocument()
  })

  it("should update filter selections when checkboxes are clicked", async () => {
    render(<FilterComp songs={mockSongs} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    const filterButton = screen.getByText("Filter")
    await userEvent.click(filterButton)

    const artistCheckbox = screen.getByLabelText("Artist1")
    await userEvent.click(artistCheckbox)

    expect(artistCheckbox).toBeChecked()

    const artist2checkbox = screen.getByLabelText("Artist2")
    await userEvent.click(artist2checkbox)
    expect(artist2checkbox).toBeChecked()

    await userEvent.click(artist2checkbox)
    expect(artist2checkbox).not.toBeChecked()
  })

  it("should call handleFilter with correct payload on apply", async () => {
    render(<FilterComp songs={mockSongs} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    const filterButton = screen.getByText("Filter")
    await userEvent.click(filterButton)

    const artistCheckbox = screen.getByLabelText("Artist1")
    await userEvent.click(artistCheckbox)

    const applyButton = screen.getByText("Apply")
    await userEvent.click(applyButton)

    expect(mockHandleFilter).toHaveBeenCalledWith({ artist: ["Artist1"], album: [] })
  })

  it("should clear filter selections on clear", async () => {
    render(<FilterComp songs={mockSongs} handleSort={mockHandleSort} handleFilter={mockHandleFilter} />)

    const filterButton = screen.getByText("Filter")
    await userEvent.click(filterButton)
    expect(screen.getByText("Clear")).toBeInTheDocument()
    expect(screen.getByText("Apply")).toBeInTheDocument()
    expect(screen.getByText("Artist")).toBeInTheDocument()
    expect(screen.getByText("Album")).toBeInTheDocument()
    expect(screen.getByLabelText("Artist1")).toBeInTheDocument()

    const artistCheckbox = screen.getByLabelText("Artist1")
    await userEvent.click(artistCheckbox)

    const clearButton = screen.getByText("Clear")
    await userEvent.click(clearButton)

    expect(mockHandleFilter).toHaveBeenCalledWith({ artist: [], album: [] })
    expect(clearButton).not.toBeInTheDocument()
  })
})
