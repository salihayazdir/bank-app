const { Client } = require('pg')
import connection from '@/sql/connection'

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
        join Account_Type ty
            on ac.account_type_id = ty.id
        join Branch br
            on ac.branch_id = br.id
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
            <h1 className='text-xl font-semibold'>Hesaplar</h1>
            <div className='flex flex-col gap-6' >
                {accounts
                    .filter(account => account.customer_id == customerId)
                    .map(account => {
                        return (
                            <div className='flex flex-col gap-2 p-6 border border-gray-200 rounded-lg shadow-lg' >
                                <span>{`Hesap Türü: ${account.acc_type_name}`}</span>
                                <span>{`Bakiye: ${account.balance}`}</span>
                                <span>{`Şube: ${account.branch_name}`}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}