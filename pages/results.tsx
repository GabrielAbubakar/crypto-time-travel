import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'


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

    const [coinExist, setCoinExist] = useState<boolean>()



    const fetchData = async (date: QueryParams, coin: QueryParams) => {
        await fetch(`https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date?.toString().split('-').reverse().join('-')}`)
            .then((res) => {
                return res.json()
            })
            .then(data => {
                setHistoricalData(data)
                if (data.hasOwnProperty('market_data')) {
                    setCoinExist(true)
                } else {
                    setCoinExist(false)
                }
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
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const computeResults = () => {
        if (coinExist) {
            let percentageDiff: number
            let priceDiff: number
            const currentUsd = currentData.market_data.current_price.usd
            const historicalUsd = historicalData.market_data.current_price.usd

            if (currentUsd > historicalUsd) {
                setIsIncreased(true)
                priceDiff = currentUsd - historicalUsd
                percentageDiff = (priceDiff / historicalUsd) * 100
                setPercentDifference(parseFloat(percentageDiff.toFixed(2)))

            } else if (currentUsd < historicalUsd) {
                setIsIncreased(false)
                priceDiff = historicalUsd - currentUsd
                percentageDiff = (priceDiff / historicalUsd) * 100
                setPercentDifference(parseFloat(percentageDiff.toFixed(2)))
            }
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
        if (historicalData && currentData && coinExist) {
            computeResults()
            setFetchSuccess(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historicalData, currentData])





    if (fetchSuccess && !coinExist) {
        return (
            <div>
                <h2>Lol🤣. This coin wasnt even a thing at the date you have chosen please go back and choose a valid date</h2>
                <Link href='/'>Go Back</Link>
            </div>
        )
    }

    if (!dataSuccess) {
        return (
            <div>
                Sorry you must have missed an input field in the last page
            </div>
        )
    }

    return (
        <div>
            {
                coinExist && (
                    <div>
                        <h1>If I had invested at</h1>
                        <p>DATE: {date?.toString().split('-').reverse().join('-')}</p>
                        <p>PRICE: ${price}</p>
                        <p>COIN: {coin}</p>

                        {
                            fetchSuccess && (
                                <div>
                                    <h3>Your purchase info:</h3>
                                    <p>Investment: ${price}</p>
                                    <p>Name: {historicalData.name}</p>
                                    <p>Price (per {historicalData.symbol}): ${historicalData.market_data.current_price.usd.toFixed(2)}</p>


                                    <h3>Current Data</h3>
                                    <p>Name: {currentData.name}</p>
                                    <p>Price (per {historicalData.symbol}): ${currentData.market_data.current_price.usd.toFixed(2)}</p>


                                    <h2 style={{ color: isIncreased == true ? 'green' : 'red' }}>
                                        Percentage Difference: {percentDifference}%
                                    </h2>

                                    {
                                        isIncreased ? (
                                            <div>
                                                <p>
                                                    Total cash value now: ${
                                                        percentDifference && (percentDifference / 100) * parseInt(price as string) + parseInt(price as string)
                                                    }
                                                </p>
                                                <p>
                                                    An increase of ${percentDifference && (percentDifference / 100) * parseInt(price as string)}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>
                                                    Total cash value now: ${
                                                        percentDifference && parseInt(price as string) - (percentDifference / 100) * parseInt(price as string)
                                                    }
                                                </p>
                                                <p>
                                                    A decrease of ${percentDifference && (percentDifference / 100) * parseInt(price as string)}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Results