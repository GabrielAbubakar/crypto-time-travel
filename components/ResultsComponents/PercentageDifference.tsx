type Props = {
    isIncreased: any,
    percentDifference: number,
}

const PercentageDifference = ({ isIncreased, percentDifference }: Props) => {
    return (
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
    )
}

export default PercentageDifference