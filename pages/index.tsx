import type { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { currencyData, Currency } from '../components/data'


const Home: NextPage = () => {

    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')
    const [currency, setCurrency] = useState('')


    const handleSubmit = (e: any) => {
        e.preventDefault()
        setDate('')
        setPrice('')
    }


    const fetchData = async () => {
        await fetch('')
            .then((res) => {
                res.json()
            })
            .then(() => {

            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        console.log()
    }, [date])


    return (
        <div>
            <h1>Crypto Time Travel🕑</h1>
            <p>
                Ever wondered how much you would have made if you&apos;d bought Bitcoin 6 years ago when that your weird pal told you to? Well, here you are, just input the amount in dollars, choose the coin and the date in the past and find out how much you could have gotten (or lost) over the years.
            </p>

            <h2>What if I had HODL</h2>
            <form>
                <label htmlFor="price">$ USD</label> <br />
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    name='price' /> <br /> <br />


                <label htmlFor="select-currency">IN:</label> <br />
                <select name="select-currency" id="select">
                    {
                        currencyData && currencyData.map((item: Currency, i: number) => (
                            <option value={item.id} key={i}>{item.name} ({item.symbol})</option>
                        ))
                    }
                </select> <br /> <br />

                <label htmlFor="date">ON:</label> <br />
                <input type="date" name='date' value={date} onChange={(e) => setDate(e.target.value)} /> <br /> <br />


                <button onClick={handleSubmit}>
                    <Link href={{
                        pathname: "/results",
                        query: {
                            price,
                            date
                        }
                    }}>
                        <a>
                            Find out what it would be worth today
                        </a>
                    </Link>
                </button>


            </form>



        </div>
    )
}

export default Home