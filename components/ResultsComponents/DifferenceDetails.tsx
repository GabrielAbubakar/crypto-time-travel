type DiffProps = {
    isIncreased: boolean | undefined,
    percentDifference: number,
    price: string | string[]
}

const DifferenceDetails = ({ isIncreased, percentDifference, price }: DiffProps) => {
    return (
        <>
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
        </>
    )
}

export default DifferenceDetails