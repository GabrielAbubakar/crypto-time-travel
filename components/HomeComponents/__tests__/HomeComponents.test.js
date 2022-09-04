import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CashInput, CoinInput, DateInput } from '../index'

const mockFn = jest.fn()



describe("Tests for the Price Input component", () => {
    it("Should render an input element", async () => {
        render(
            <CashInput />
        )

        const element = screen.getByTitle(/amount/i)
        expect(element).toBeInTheDocument()
    })

    it("Should render an input element with props passed", async () => {
        render(
            <CashInput price='23' />
        )

        const element = screen.getByTitle(/amount/i)
        expect(element.value).toBe('23')
    })

    it("Should fire a function onChange", async () => {
        const input = userEvent.setup()

        render(
            <CashInput price={23} setPrice={mockFn} />
        )

        const element = screen.getByTitle(/amount/i)
        await input.type(element, '20')
        expect(mockFn).toHaveBeenCalled()
    })

})


describe("Tests for the Coin Input component", () => {
    it("Should render an input element", async () => {

        render(
            <CoinInput />
        )

        const element = screen.getByTitle(/coin/i)
        expect(element).toBeInTheDocument()
    })


    it("Should fire a function onChange", async () => {
        const input = userEvent.setup()
        render(
            <CoinInput setCoin={mockFn} />
        )

        const element = screen.getByTitle(/coin/i)
        await input.selectOptions(element, 'solana')

        expect(mockFn).toHaveBeenCalled()
        expect(screen.getByRole('option', { name: /solana/i }).selected).toBe(true)
    })

})


describe("Tests for the Date Input component", () => {
    it("Should render an input element", async () => {

        render(
            <DateInput />
        )

        const element = screen.getByTitle(/date/i)
        expect(element).toBeInTheDocument()
    })

    // it("Should render an input element with props passed", async () => {

    //     render(
    //         <DateInput date='09/16/2022' setDate={mockFn} />
    //     )

    //     const element = screen.getByTitle(/date/i)
    //     expect(element.value).toBe('09/16/2022')
    // })

    it("Should fire a function onChange", async () => {
        const input = userEvent.setup()
        render(
            <DateInput setDate={mockFn} />
        )

        const element = screen.getByTitle(/date/i)
        await input.type(element, '09/09/2022')
        expect(mockFn).toHaveBeenCalled()
    })

})
