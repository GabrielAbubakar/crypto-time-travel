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
    const [payout, setPayout] = useState<string>()


    const fetchData = async (date: QueryParams, coin: QueryParams) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date?.toString().split('-').reverse().join('-')}`)
            .then((res) => {
                return res.json()
            })
            .then(data => {
                setHistoricalData(data)
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })

        await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
            .then((res) => {
                return res.json()
            })
            .then(data => {
                setCurrentData(data)
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const computeResults = () => {
        let percentageDiff: number
        let priceDiff: number
        const currentUsd = currentData.market_data.current_price.usd
        const historicalUsd = historicalData.market_data.current_price.usd



        if (currentUsd > historicalUsd) {
            setIsIncreased(true)
            priceDiff = currentUsd - historicalUsd
            percentageDiff = (priceDiff / historicalUsd) * 100
            setPercentDifference(percentageDiff)

        } else if (currentUsd < historicalUsd) {
            setIsIncreased(false)
            priceDiff = historicalUsd - currentUsd
            percentageDiff = (priceDiff / historicalUsd) * 100
            setPercentDifference(percentageDiff)
        }

    }

    useEffect(() => {
        if (date && coin && price) {
            fetchData(date, coin)
            setDataSuccess(true)
        } else {
            setDataSuccess(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    useEffect(() => {
        if (historicalData && currentData) {
            computeResults()
            setFetchSuccess(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historicalData, currentData])



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

            {
                fetchSuccess && (
                    <div>
                        <h3>Historical Data</h3>
                        <p>Name: {historicalData.name}</p>
                        <p>Price: ${historicalData.market_data.current_price.usd.toFixed(2)}</p>


                        <h3>Current Data</h3>
                        <p>Name: {currentData.name}</p>
                        <p>Price: ${currentData.market_data.current_price.usd.toFixed(2)}</p>


                        <h2 style={{ color: isIncreased == true ? 'green' : 'red' }}>
                            Percentage Difference: {percentDifference?.toFixed(2)}%
                        </h2>
                    </div>
                )
            }
        </div>
    )
}

export default Results