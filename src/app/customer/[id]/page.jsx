const { Client } = require('pg')
import connection from '@/sql/connection'
import Link from 'next/link'

async function getAccounts(customerId) {
  const db = new Client(connection)
  await db.connect()
   
  const res = await db.query(`
    select
        ac.*,
        br.branch_name,
        ty.acc_type_name,
        ty.try_multiplier
    from
        Account ac
        left join Account_Type ty
            on ac.account_type_id = ty.id
        left join Branch br
            on ac.branch_id = br.id
    where
        ac.customer_id = ${customerId}
`)
  
  await db.end()
  console.log(res.rows[0])
  return res.rows
}

export default async function CustomerPage({params}) {
    const customerId = params.id
    const accounts = await getAccounts(customerId)

    return (
        <div className='flex flex-col w-full gap-6' >
            <h1 className='pb-2 text-xl font-semibold text-indigo-700 border-b border-indigo-600'>Hesaplar</h1>
            <div className='flex flex-col gap-6' >
                {accounts
                    .filter(account => account.customer_id == customerId)
                    .map(account => {
                        const openingDate = new Date(account.opening_date)
                        const expirationDate = new Date(account.expiration_date)
                        const isTryAccount = account.acc_type_name === 'TRY'
                        return (
                            <div className='flex flex-col gap-2 p-6 border border-gray-100 rounded-lg shadow-lg' >
                                <span>{`Hesap No: ${account.account_number}`}</span>
                                <span>{`Hesap Türü: ${account.acc_type_name}`}</span>
                                <span>{`Bakiye: ${account.balance} ${account.acc_type_name}`}</span>
                                {!isTryAccount && (<span>{`TL Karşılığı: ${account.balance * account.try_multiplier} TL`}</span>)}
                                <span>{`Şube: ${account.branch_name}`}</span>
                                <span>{`Hesap Açılış Tarihi: ${openingDate.getDate()}.${openingDate.getMonth()}.${openingDate.getFullYear()}`}</span>
                                <span>{`Şu tarihe kadar geçerli: ${expirationDate.getDate()}.${expirationDate.getMonth()}.${expirationDate.getFullYear()}`}</span>
                                <Link href={`/account/${account.account_number}`}>
                                    <button className='px-4 py-2 font-bold text-indigo-700 rounded-md bg-indigo-50' >Hesaba Git</button>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}