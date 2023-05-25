import ClientComp from '@/components/clientComp'
import Image from 'next/image'
const { Client } = require('pg')

async function getUsers() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'banka',
    user: 'postgres',
    password: '1',
  })
  await client.connect()
   
  const res = await client.query('select * from customer')
  
  await client.end()
  console.log(res.rows[0])
  return res.rows
}

export default async function Home() {
  const customers = await getUsers()

  return (
    <div className="flex">
      <div className='min-h-screen p-6 border-r border-gray-200 shadow-xl'>
        {
          customers.map(customer => {
            return (
              <div>
                <span>{customer.customer_name}</span>
              </div>
            )
          })
        }
      </div>
      <div className='flex flex-col p-8' >
        <div>{JSON.stringify(customers)} </div>
      </div>
    </div>
  )
}
