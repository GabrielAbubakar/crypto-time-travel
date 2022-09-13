import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Results from '../pages/results'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '../test-utils/createMockRouter'


// mocking out the router and giving it query
// jest.mock("next/router", () => ({
//     useRouter: () => ({
//         query: {}
//     })
// }))


describe("Tests for the results page", () => {
    // test 1
    describe("Test with specific mocked result", () => {
        beforeEach(() => {
            render(
                <RouterContext.Provider
                    value={createMockRouter({
                        query: {
                            price: '100',
                            coin: 'bitcoin',
                            date: '09/10/2022'
                        }
                    })}>
                    <Results />
                </RouterContext.Provider>
            )
        })


        it("Should render out results after fetch", async () => {
            // const elem = screen.getByText(/bitcoin/i)
            // expect(elem).toBeInTheDocument()
        })
    })
})