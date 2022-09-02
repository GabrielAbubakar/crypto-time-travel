import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Contatiner from '../components/Contatiner'


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


    return (
        <Contatiner>
            <div className='max-w-7xl mx-auto px-6 pt-20 pb-10'>

                <div>
                    <h1
                        className='text-gray-200 font-bold text-3xl md:text-4xl mb-12'
                    >If you had invested <span className='text-green-700'>$100</span> in <span className='text-indigo-400'>Bitcoin</span> at <span className='text-sky-700'>24-06-2000</span></h1>

                    <div>
                        <div className='mb-10'>
                            <h3 className='mb-2 text-2xl font-bold tracking-tight text-white'>Your purchase info:</h3>
                            <p>Investment: $100</p>
                            <p>Name: Bitcoin</p>
                            <p>Price (per BTC at chosen date): $19000</p>
                        </div>


                        <div className='mb-10'>
                            <h3 className='mb-2 text-2xl font-bold tracking-tight text-white'>Current Coin Data:</h3>
                            <p>Name: Bitcoin</p>
                            <p>Price (per BTC): $18000</p>
                        </div>


                        {/* <h2 style={{ color: isIncreased == true ? 'green' : 'red' }}> */}
                        <h2 className='mb-10 text-3xl'>
                            Percentage Difference: <span className='text-green-600 font-bold'>+20.5%</span>
                        </h2>

                        {/* <div className='mb-5 block p-6 max-w-sm rounded-lg border  
                        shadow-md bg-gray-900 border-gray-700 '>
                            <p className='mb-2 text-2xl font-bold tracking-tight text-white'>
                                Total cash value now: $120
                            </p>
                            <p>
                                Your initial deposit has now given you returns with an additional <span className='text-green-600 font-bold'>$20</span> 🕺🏽🕺🏽
                            </p>
                        </div> */}

                        <div className='block p-6 max-w-sm rounded-lg border shadow-md
                         bg-gray-900 border-gray-700'>
                            <p className='mb-2 text-2xl font-bold tracking-tight text-white'>
                                Total cash value now: $80
                            </p>
                            <p>
                                Unfortunately the coin&apos;s value fell and your initial deposit has resulted in a  <span className='text-red-600 font-bold'>$20</span> loss. 😥😥
                            </p>
                        </div>

                    </div>

                </div>

                <p className='mt-40 text-center text-sm text-slate-500'>All numeric values represented in this application are sourced from the <a className='text-blue-700' href="#">Coin Gecko API</a> and are approximated to two decimal points as most calculations involving crypto-currencies result in multiple decimal places to encourage simplicity and readability of results.  </p>

                <p className='text-sm text-center text-slate-500'>Made with ❤ by Gabriel Abubakar. <a className='text-blue-700' href="#">View Source Code</a></p>
            </div>
        </Contatiner>
    )
}

export default Results