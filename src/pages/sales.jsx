import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import useSWR from 'swr'

import Skeleton from '@/components/skeleton'
import MyBtn from '@/components/myBtn'

function Sales() {
  const [sales, setSales] = useState()
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data, error, isLoading } = useSWR(
    `https://myshop-c3818-default-rtdb.firebaseio.com/sales.json`,
    fetcher,
  )

  useEffect(() => {
    if (data) {
      const transformedSales = []

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }

      setSales(transformedSales)
    }
  }, [data])

  // useEffect(() => {
  //   axios
  //     .get(`https://myshop-c3818-default-rtdb.firebaseio.com/sales.json`)
  //     .then((res) => {
  //       const transformedSales = []

  //       for (const key in res.data) {
  //         transformedSales.push({
  //           id: key,
  //           username: res.data[key].username,
  //           volume: res.data[key].volume,
  //         })
  //       }

  //       setSales(transformedSales)
  //     })
  //     .catch(console.log)
  // }, [])

  if (isLoading) return <Skeleton />

  if (error) return <div>Error...</div>

  return (
    <>
      <div className="flex justify-center mt-4">
        <MyBtn onClick={handleClick}>Index Page</MyBtn>
      </div>
      <ul>
        {sales &&
          sales.map((sale) => (
            <li key={sale.id}>
              {sale.username} / {sale.volume}
            </li>
          ))}
      </ul>
    </>
  )
}

export default Sales
