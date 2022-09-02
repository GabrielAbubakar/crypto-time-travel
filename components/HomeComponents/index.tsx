import { currencyData, Currency } from '../data'


type CashProps = {
    price: string,
    setPrice: any
}

type DateProps = {
    date: string,
    setDate: any
}

type CoinProps = {
    coin: string,
    setCoin: any,
}





export const CashInput = ({ price, setPrice }: CashProps) => {
    return (
        <>
            <input
                className='border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 
                            bg-gray-600 border-gray-500 placeholder-gray-400 text-gray-100 shadow-sm 
                            placeholder-black-800 placeholder:italic focus:outline-none mb-7 w-full'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name='price' />
        </>
    )
}


export const CoinInput = ({ coin, setCoin, }: CoinProps) => {
    return (
        <>
            <select
                className='placeholder-black-800 placeholder:italic border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-gray-100 
                     mb-7 w-full'
                required
                name="select-currency" id="select" onChange={(e) => setCoin(e.target.value)}>
                {
                    currencyData && currencyData.map((item: Currency, i: number) => (
                        <option value={item.id} key={i}>
                            {item.name} ({item.symbol})
                        </option>
                    ))
                }
            </select>
        </>
    )
}

export const DateInput = ({ date, setDate }: DateProps) => {
    return (
        <>
            <input
                className='placeholder-black-800 placeholder:italic border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-gray-100 
                    mb-7 w-full'
                required
                type="date"
                name='date'
                value={date}
                onChange={(e) => setDate(e.target.value)} />
        </>
    )
}