import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Contatiner from '../components/Container'
import PercentageDifference from '../components/ResultsComponents/PercentageDifference'
import PurchaseInfo from '../components/ResultsComponents/PurchaseInfo'
import DifferenceDetails from '../components/ResultsComponents/DifferenceDetails'
import Footer from '../components/ResultsComponents/Footer'


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
                                        <PurchaseInfo
                                            price={price}
                                            historicalData={historicalData}
                                            currentData={currentData}
                                        />

                                        <PercentageDifference
                                            isIncreased={isIncreased}
                                            percentDifference={percentDifference!}
                                        />

                                        <DifferenceDetails
                                            isIncreased={isIncreased}
                                            percentDifference={percentDifference!}
                                            price={price!}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                <Footer />
            </div>
        </Contatiner>
    )
}

export default Results