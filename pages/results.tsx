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
        const fetchUrl = fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${date?.toString().split('-').reverse().join('-')}`)
        const currentDataUrl = fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)

        const [hdata, cdata] = await Promise.all([
            fetchUrl,
            currentDataUrl
        ]);

        const history = await hdata.json()
        const current = await cdata.json()

        return [history, current]
        // returns a promise with the result return above
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

    const initFetch = () => {
        // if query values were all recieved run the api call
        if (date && coin && price) {
            setDataSuccess(true)

            fetchData(date, coin)
                .then(([his, cur]) => {
                    // set states if succesful
                    setHistoricalData(his)
                    setCurrentData(cur)

                    // check if the coin exited at the chosen date
                    if (his.hasOwnProperty('market_data')) {
                        setCoinExist(true)
                    } else {
                        setCoinExist(false)
                    }
                    setFetchSuccess(true)
                })
                .catch((err) => {
                    // handle errors
                    setFetchSuccess(false)
                    console.log(err);
                })
        } else {
            setDataSuccess(false)
        }
    }


    useEffect(() => {
        initFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    useEffect(() => {
        if (historicalData && currentData && coinExist) {
            computeResults()
            // setFetchSuccess(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historicalData, currentData])

    // if (dataSuccess && !fetchSuccess) {
    //     return (
    //         <Contatiner>
    //             <h2 className='p-10'>
    //                 Loading...
    //             </h2>
    //         </Contatiner>
    //     )
    // }

    if (fetchSuccess == false) {
        return (
            <Contatiner>
                <h2 className='p-10'>
                    Network Error. Please check your internet connection and try again.
                </h2>
            </Contatiner>
        )
    }

    if (fetchSuccess && !coinExist) {
        return (
            <Contatiner>
                <h2 className='p-10'>
                    The coin that you have chosen has no data on the date you chose. Please go back and choose a date before today, when the coin existed and not a date after today.
                </h2>
                <Link href='/'>Go Back</Link>
            </Contatiner>
        )
    }

    // if (!dataSuccess) {
    //     return (
    //         <Contatiner>
    //             Sorry you must have missed an input field in the last page
    //         </Contatiner>
    //     )
    // }

    return (
        <Contatiner>
            <div className='max-w-7xl mx-auto px-6 pt-20 pb-10'>
                {
                    coinExist && (
                        <div>
                            <h1 className='text-gray-200 font-bold text-3xl md:text-4xl mb-12'>
                                If you had invested <span className='text-green-700'>${price}</span> in
                                <span className='text-indigo-400'> {coin}</span> at {date?.toString().split('-').reverse().join('-')}
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