import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import GenericBtn from "./GenericBtn"
import { describe, expect, it, vi } from "vitest"

describe("GenericBtn component", () => {
  it("renders the button with correct title and background color", () => {
    render(<GenericBtn title="Click Me" backgColor="red" handleClick={() => {}} />)

    const btn = screen.getByRole("button", { name: /click me/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveStyle("background-color: rgb(255, 0, 0)")
  })

  it("calls handleClick when clicked", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<GenericBtn title="Submit" backgColor="blue" handleClick={handleClick} />)

    const btn = screen.getByRole("button", { name: /submit/i })
    await user.click(btn)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
