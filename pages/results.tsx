import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


type QueryParams = string | string[] | undefined


const Results: NextPage = () => {

    // desctructure the data needed from router params
    const { query } = useRouter()
    const { date, price, coin } = query

    // ui state
    const [historicalData, setHistoricalData] = useState<any>()
    const [currentData, setCurrentData] = useState<any>()

    const [dataSuccess, setDataSuccess] = useState<boolean>()
    const [fetchSuccess, setFetchSuccess] = useState<boolean>()

    const [isIncreased, setIsIncreased] = useState<boolean>()
    const [percentDifference, setPercentDifference] = useState<number>()
    const [priceDifference, setPriceDifference] = useState<number>()


    const fetchData = async (date: QueryParams, coin: QueryParams) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date?.toString().split('-').reverse().join('-')}`)
            .then((res) => {
                return res.json()
            })
            .then(data => {
                setHistoricalData(data)
                setFetchSuccess(true)
                console.log(data);
            })
            .catch((err) => {
                setFetchSuccess(false)
                console.log(err);
            })

        await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
            .then((res) => {
                return res.json()
            })
            .then(data => {
                setCurrentData(data)
                setFetchSuccess(true)
                console.log(data);
            })
            .catch((err) => {
                setFetchSuccess(false)
                console.log(err);
            })
    }

    useEffect(() => {
        if (query.date) {
            fetchData(date, coin)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    useEffect(() => {
        if (historicalData) {
            if (historicalData.market_data.current_price.usd.toFixed(2) > parseFloat(price as string)) {
                setIsIncreased(true)
                setPriceDifference(historicalData.market_data.current_price.usd.toFixed(2) - parseFloat(price as string))
                // setPercentDifference(priceDifference / parseFloat(price) * 100)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historicalData])

    useEffect(() => {
        if (date == '' || price == '' || coin == '') {
            setDataSuccess(false)
        } else {
            setDataSuccess(true)
        }
    }, [date, price, coin])



    if (!dataSuccess) {
        return (
            <div>
                Sorry you must have missed an input field in the last page
            </div>
        )
    }


    return (
        <div>
            <h1>If I had invested at</h1>
            <p>DATE: {date?.toString().split('-').reverse().join('-')}</p>
            <p>PRICE: ${price}</p>
            <p>COIN: {coin}</p>

            <h2>The value today will be</h2>
            {
                fetchSuccess && (
                    <div>
                        <p>Name: {historicalData.name}</p>
                        <p>Price: ${historicalData.market_data.current_price.usd.toFixed(2)}</p>
                        <p>Price Increase: ${priceDifference}</p>
                        <p>Percentage Increase: ${percentDifference}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Results