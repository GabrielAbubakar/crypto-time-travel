// define the type for each currency item
export type Currency = {
    id: string,
    name: string,
    symbol: string
}

// create the array of choosable currencies and their query values ()
export const currencyData: Currency[] = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETC" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE" },
    { id: "binancecoin", name: "Binancecoin", symbol: "BNB" },
    { id: "tether", name: "Tether", symbol: "USDT" },
    { id: "ripple", name: "XRP", symbol: "XRP" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "shiba-inu", name: "Shiba Inu", symbol: "SHIB" },
]