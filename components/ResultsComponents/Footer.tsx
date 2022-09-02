


const Footer = () => {
    return (
        <footer>
            <p className='mt-40 text-center text-sm text-slate-500'>
                All numeric values represented in this application are sourced from the
                <a className='text-blue-700' href="#">Coin Gecko API</a>
                and are approximated to two decimal points as most calculations involving crypto-currencies result
                in multiple decimal places to encourage simplicity and readability of results.
            </p>

            <p className='text-sm text-center text-slate-500'>
                Made with ❤ by Gabriel Abubakar. <a className='text-blue-700' href="#">View Source Code</a>
            </p>
        </footer>
    )
}

export default Footer