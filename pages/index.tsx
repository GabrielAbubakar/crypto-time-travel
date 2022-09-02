import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Contatiner from '../components/Container'
import { currencyData, } from '../components/data'
import { CashInput, CoinInput, DateInput } from '../components/HomeComponents'


const Home: NextPage = () => {

    const router = useRouter()

    const [price, setPrice] = useState<string>('')
    const [date, setDate] = useState('')
    const [coin, setCoin] = useState(currencyData[0].id)

    const [formFill, setFormFill] = useState<boolean>()


    const handleSubmit = (e: any): void => {
        // reset UI state on form submit
        e.preventDefault()

        if (price && date && coin) {
            setFormFill(true)
            router.push({
                pathname: "/results",
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
            }, 5000);
        }
    }

    return (
        <Contatiner>
            <div className='max-w-7xl mx-auto px-6 pt-20 pb-20'>
                <h1 className='text-2xl md:text-3xl font-bold mb-9 md:mb-12 text-blue-400'>🏃🏽‍♂️Crypto Time Travel🕑</h1>
                <p className='mb-16'>
                    Ever wondered how much you would have made if you&apos;d bought Bitcoin 6 years ago when that your weird pal told you to? Well, here you are, just input the amount in dollars, choose the coin and the date in the past and find out how much you could have gotten (or lost) over the years.
                </p>

                <h2 className='mb-5 text-gray-200'>What if I had invested</h2>
                <form className='bg-gray-800 px-6 py-12 md:px-10 md:py-12 rounded-sm border-gray-700 border'>
                    <label
                        className='text-base'
                        htmlFor="price">$ USD</label>
                    <CashInput price={price} setPrice={setPrice} />


                    <label
                        className='text-base'
                        htmlFor="select-currency">IN:</label>
                    <CoinInput coin={coin} setCoin={setCoin} />

                    <label
                        className='text-base'
                        htmlFor="date">ON:</label>
                    <DateInput date={date} setDate={setDate} />


                    <button
                        className='mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        onClick={handleSubmit}>
                        <a>
                            Find out what it would be worth today
                        </a>
                    </button>

                </form>

                {formFill == false && (
                    <p style={{ color: 'red', marginTop: '2rem' }}>Please fill the form correctly (a date, a coin and a price value)</p>
                )}

            </div>
        </Contatiner >
    )
}

export default Home