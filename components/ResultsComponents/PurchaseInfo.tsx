type InfoProps = {
    price: any,
    historicalData: any,
    currentData: any,
}


const PurchaseInfo = ({ price, historicalData, currentData }: InfoProps) => {
    return (
        <>
            <div className='mb-10'>
                <h3 className='mb-2 text-2xl font-bold tracking-tight text-white'>Your purchase info:</h3>
                <p>Investment: ${price}</p>
                <p>Name: {historicalData.name}</p>
                <p>Price (per {historicalData.symbol} then): ${historicalData.market_data.current_price.usd.toFixed(2)}</p>
            </div>

            <div className='mb-10'>
                <h3 className='mb-2 text-2xl font-bold tracking-tight text-white'>Current Coin Data:</h3>
                <p>Name: {currentData.name}</p>
                <p>Price (per {historicalData.symbol} now): ${currentData.market_data.current_price.usd.toFixed(2)}</p>
            </div>
        </>
    )
}

export default PurchaseInfo