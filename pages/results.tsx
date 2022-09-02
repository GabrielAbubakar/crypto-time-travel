import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Contatiner from '../components/Container'


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
                setFetchSuccess(false)
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
                setFetchSuccess(false)
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

    // if (dataSuccess && !fetchSuccess) {
    //     return (
    //         <Contatiner>
    //             Loading...
    //         </Contatiner>
    //     )
    // }

    if (fetchSuccess == false) {
        return (
            <Contatiner>
                <h2>Network Error. Please check your internet connection and try again.</h2>
            </Contatiner>
        )
    }

    if (fetchSuccess && !coinExist) {
        return (
            <Contatiner>
                <h2>Lol🤣. This coin wasnt even a thing at the date you have chosen please go back and choose a valid date</h2>
                <Link href='/'>Go Back</Link>
            </Contatiner>
        )
    }

    if (!dataSuccess) {
        return (
            <Contatiner>
                Sorry you must have missed an input field in the last page
            </Contatiner>
        )
    }

    return (
        <Contatiner>
            <div className='max-w-7xl mx-auto px-6 pt-20 pb-10'>
                {
                    coinExist && (
                        <div>
                            <h1 className='text-gray-200 font-bold text-3xl md:text-4xl mb-12'>
                                If you had invested <span className='text-green-700'>${price}</span> in
                                <span className='text-indigo-400'> {coin}</span> at
                                <span className='text-sky-700'> {date?.toString().split('-').reverse().join('-')}</span>
                            </h1>


                            {
                                fetchSuccess && (
                                    <div>
                                        <div className='mb-10'>
                                            <h3 className='mb-2 text-2xl font-bold tracking-tight text-white'>Your purchase info:</h3>
                                            <p>Investment: ${price}</p>
                                            <p>Name: {historicalData.name}</p>
                                            <p>Price (per {historicalData.symbol}): ${historicalData.market_data.current_price.usd.toFixed(2)}</p>
                                        </div>

                                        <div className='mb-10'>
                                            <h3 className='mb-2 text-2xl font-bold tracking-tight text-white'>Current Coin Data:</h3>
                                            <p>Name: {currentData.name}</p>
                                            <p>Price (per {historicalData.symbol}): ${currentData.market_data.current_price.usd.toFixed(2)}</p>
                                        </div>

                                        <h2 className='mb-10 text-3xl'>
                                            Percentage Difference: {
                                                isIncreased ? (
                                                    <span className='text-green-600 font-bold'>
                                                        +{percentDifference}%
                                                    </span>
                                                ) : (
                                                    <span className='text-red-600 font-bold'>
                                                        -{percentDifference}%
                                                    </span>
                                                )
                                            }

                                        </h2>


                                        {
                                            isIncreased ? (
                                                <div className='block p-6 max-w-sm rounded-lg border shadow-md
                                                bg-gray-900 border-gray-700'>
                                                    <p className='mb-2 text-2xl font-bold tracking-tight text-white'>
                                                        Total cash value now: ${
                                                            (percentDifference && (percentDifference / 100) * parseInt(price as string) + parseInt(price as string))?.toFixed(2)
                                                        }
                                                    </p>
                                                    <p>
                                                        Your initial deposit has now given you returns with an additional <span className='text-green-600 font-bold'>
                                                            ${
                                                                (percentDifference && (percentDifference / 100) * parseInt(price as string))?.toFixed(2)
                                                            }
                                                        </span> 🕺🏽🕺🏽
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className='mb-2 text-2xl font-bold tracking-tight text-white'>
                                                        Total cash value now: ${
                                                            percentDifference && parseInt(price as string) - (percentDifference / 100) * parseInt(price as string)
                                                        }
                                                    </p>
                                                    <p>
                                                        Unfortunately the coin&apos;s value fell and your initial deposit has resulted in a  <span className='text-red-600 font-bold'>
                                                            ${percentDifference && (percentDifference / 100) * parseInt(price as string)}
                                                        </span> loss😢😢
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

                <p className='mt-40 text-center text-sm text-slate-500'>
                    All numeric values represented in this application are sourced from the
                    <a className='text-blue-700' href="#">Coin Gecko API</a>
                    and are approximated to two decimal points as most calculations involving crypto-currencies result
                    in multiple decimal places to encourage simplicity and readability of results.
                </p>

                <p className='text-sm text-center text-slate-500'>
                    Made with ❤ by Gabriel Abubakar. <a className='text-blue-700' href="#">View Source Code</a>
                </p>
            </div>
        </Contatiner>
    )
}

export default Results