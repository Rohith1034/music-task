import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import FilterSection from "./FilterSection"

describe("FilterSection", () => {
  const mockHandleFilterSelection = vi.fn()
  const artisVal = "artist1"
  const filterSelectionVal = { artist: [], album: [] }

  it("should render without crashing", () => {
    render(<FilterSection val={artisVal} type="artist" handleFilterSelection={mockHandleFilterSelection} filterSelections={filterSelectionVal} />)
    expect(screen.getByText(artisVal)).toBeInTheDocument()
  })

  it("should call handleFilterSelection when checkbox is clicked", () => {
    render(<FilterSection val={artisVal} type="artist" handleFilterSelection={mockHandleFilterSelection} filterSelections={filterSelectionVal} />)
    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)
    expect(mockHandleFilterSelection).toHaveBeenCalledWith("artist", artisVal)
  })

  it("should check the checkbox if the value is in filterSelections", () => {
    const updatedFilterSelectionVal = { artist: [artisVal], album: [] }
    render(<FilterSection val={artisVal} type="artist" handleFilterSelection={mockHandleFilterSelection} filterSelections={updatedFilterSelectionVal} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toBeChecked()
  })

  it("should uncheck the checkbox if the value is not in filterSelections", () => {
    render(<FilterSection val={artisVal} type="artist" handleFilterSelection={mockHandleFilterSelection} filterSelections={filterSelectionVal} />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).not.toBeChecked()
  })
})
