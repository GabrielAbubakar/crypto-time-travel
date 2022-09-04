import { currencyData, Currency } from '../data'


type CashProps = {
    price: string,
    setPrice: (e: string) => any | void
}

type DateProps = {
    date: string,
    setDate: (e: string) => any | void
}

type CoinProps = {
    coin: string,
    setCoin: (e: string) => any | void
}

type ButtonProps = {
    submit: (e: any) => any | void
}





export const CashInput = ({ price, setPrice }: CashProps) => {
    return (
        <>
            <input
                title='amount'
                className='border text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 p-2.5 
                            bg-gray-600 border-gray-500 placeholder-gray-400 text-gray-100 shadow-sm 
                            placeholder-black-800 placeholder:italic focus:outline-none mb-7 w-full'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name='price'
                placeholder='Amount'
            />
        </>
    )
}


export const CoinInput = ({ coin, setCoin, }: CoinProps) => {
    return (
        <>
            <select
                title='coin-select'
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
                title='date'
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


export const SubmitButton = ({ submit }: ButtonProps) => {
    return (
        <>
            <button
                role='submit'
                className='mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={submit}>
                <a>
                    Find out what it would be worth today
                </a>
            </button>
        </>
    )
}