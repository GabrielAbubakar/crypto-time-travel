import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Contatiner from '../components/Contatiner'
import { currencyData, Currency } from '../components/data'


const Home: NextPage = () => {

    const router = useRouter()

    const [price, setPrice] = useState<number>()
    const [date, setDate] = useState('')
    const [coin, setCoin] = useState(currencyData[0].id)

    const [formFill, setFormFill] = useState<boolean>()


    const handleSubmit = (e: any): void => {
        // reset UI state on form submit
        e.preventDefault()

        if (price && date && coin) {
            setFormFill(true)
            router.push({
                pathname: "/results2",
                query: {
                    price,
                    coin,
                    date
                }
            })
        } else {
            setFormFill(false)
            setTimeout(() => {
                setFormFill(true)
            }, 4000);
        }
    }

    return (
        <Contatiner>
            <div className='max-w-7xl mx-auto px-6 pt-20 pb-4'>
                <h1 className='text-2xl md:text-3xl font-bold mb-9 md:mb-12 text-blue-400'>🏃🏽‍♂️Crypto Time Travel🕑</h1>
                <p className='mb-16'>
                    Ever wondered how much you would have made if you&apos;d bought Bitcoin 6 years ago when your friend had told you to? Well, here you are, just input the amount in dollars, choose the coin and the date in the past and step into the time machine to find out how much you could have gotten (or lost) over the years.
                </p>

                <h2 className='mb-5 text-gray-200'>What if I had put:</h2>
                <form className='bg-gray-800 px-6 py-12 md:px-10 md:py-12 rounded-sm border-gray-700 border' >
                    <label
                        className='text-base'
                        htmlFor="price">$ USD</label> <br />
                    <input
                        className='border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 
                        bg-gray-600 border-gray-500 placeholder-gray-400 text-gray-100 shadow-sm 
                        placeholder-black-800 placeholder:italic focus:outline-none mb-7 w-full'
                        required
                        placeholder='Amount'
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        type="number"
                        name='price' /> <br />


                    <label
                        className='text-base'
                        htmlFor="select-currency">IN:</label> <br />
                    <select
                        className='placeholder-black-800 placeholder:italic border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-gray-100 
                        mb-7 w-full'
                        required
                        name="select-currency"
                        id="select"
                        onChange={(e) => setCoin(e.target.value)}>
                        {
                            currencyData && currencyData.map((item: Currency, i: number) => (
                                <option value={item.id} key={i}>
                                    {item.name} ({item.symbol})
                                </option>
                            ))
                        }
                    </select> <br />

                    <label
                        className='text-base'
                        htmlFor="date">ON:</label> <br />
                    <input
                        className='placeholder-black-800 placeholder:italic border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-gray-100 
                        mb-7 w-full'
                        required
                        type="date"
                        name='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)} /> <br /> <br />


                    <button
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        onClick={handleSubmit}>
                        <a>
                            Enter the time machine⌛
                        </a>
                    </button>

                </form>

                {formFill == false && (
                    <p style={{ color: 'red' }}>Please fill the form correctly (a date, a coin and a price value)</p>
                )}

            </div>
        </Contatiner>
    )
}

export default Home