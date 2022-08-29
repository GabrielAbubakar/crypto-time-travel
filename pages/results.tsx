import type { NextPage } from 'next'
import { useRouter } from 'next/router'


const Results: NextPage = () => {

    // desctructure the data needed from router params
    const { query } = useRouter()
    const { date, price, coin } = query
    // console.log(date?.toString().split('-').reverse().join('-'))

    const fetchData = async () => {
        await fetch('')
            .then((res) => {
                res.json()
            })
            .then(() => {

            })
            .catch((err) => {
                console.log(err);
            })
    }

    if (date == '' || price == '' || coin == '') {
        return (
            <div>
                Sorry you didnt input a field in the last page
            </div>
        )
    }


    return (
        <div>
            <p>{date}</p>
            <p>{price}</p>
            <p>{coin}</p>
        </div>
    )
}

export default Results