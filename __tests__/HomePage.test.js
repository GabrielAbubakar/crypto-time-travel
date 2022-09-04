import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../pages/index'

const mockFn = jest.fn()


describe("Tests for the Homepage", () => {
    it("Should render the homepage UI", () => {
        render(
            <Home />
        )

        expect(screen.getByRole("heading", { name: /crypto/i })).toBeInTheDocument()
        expect(screen.getByRole("form")).toBeInTheDocument()
        expect(screen.getByTitle("date")).toBeInTheDocument()
        expect(screen.getByTitle("coin-select")).toBeInTheDocument()
        expect(screen.getByTitle("amount")).toBeInTheDocument()
        expect(screen.getByRole("submit")).toBeInTheDocument()
    })

    it("Should fire a function when function submitted", () => {
        const user = userEvent.setup()

        render(
            <Home />
        )

        // const button = screen.getByRole("submit")
        // button.addEventListener('click', mockFn)
        // user.click(button)

        // expect(mockFn).toHaveBeenCalled()
    })

    it("Onchange inputs should change the state of their linked values", async () => {
        const user = userEvent.setup()
        render(
            <Home />
        )

        const element = screen.getByTitle("amount")
        await user.type(element, "1234")

        expect(element).toHaveDisplayValue("1234")
    })
})