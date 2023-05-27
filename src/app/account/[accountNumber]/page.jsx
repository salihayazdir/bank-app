const { Client } = require('pg')
import connection from '@/sql/connection'
import Link from 'next/link'

async function getAccount(accountNumber) {
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
        ac.account_number = ${accountNumber}
`)
  
  await db.end()
//   console.log(res.rows[0])
  return res.rows
}

export default async function CustomerPage({params}) {
    const {accountNumber} = params
    const accounts = await getAccount(accountNumber)
    const account = accounts[0]
    
    const openingDate = new Date(account.opening_date)
    const expirationDate = new Date(account.expiration_date)
    const isTryAccount = account.acc_type_name === 'TRY'
    
    return (
        <div className='flex flex-col w-full gap-12' >
            <div className='flex flex-col gap-4' >
                <h1 className='pb-2 text-xl font-semibold text-teal-600 border-b border-teal-600'>{`Hesap No: ${account.account_number}`}</h1>
                <div className='flex flex-col gap-4' >
                        <span>{`Hesap Türü: ${account.acc_type_name}`}</span>
                        <span>{`Bakiye: ${account.balance} ${account.acc_type_name}`}</span>
                        {!isTryAccount && (<span>{`TL Karşılığı: ${account.balance * account.try_multiplier} TL`}</span>)}
                        <span>{`Şube: ${account.branch_name}`}</span>
                        <span>{`Hesap Açılış Tarihi: ${openingDate.getDate()}.${openingDate.getMonth()}.${openingDate.getFullYear()}`}</span>
                        <span>{`Şu tarihe kadar geçerli: ${expirationDate.getDate()}.${expirationDate.getMonth()}.${expirationDate.getFullYear()}`}</span>
                </div>
            </div>
            <div className='flex flex-col gap-4' >
                <h1 className='pb-2 text-xl font-semibold text-teal-600 border-b border-teal-600'>{`Para Gönder`}</h1>
                <form className='flex flex-col gap-4' >
                    <div>
                        <label htmlFor="receiver_id" className="block text-sm font-medium">Alıcı Hesap No.</label>
                        <input type="text" id="receiver_id" className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5" placeholder="" required/>
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium">Miktar</label>
                        <input type="number" id="amount" className="bg-gray-50 border border-gray-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5" placeholder="" required/>
                    </div>
                    <button type='submit' className='p-2.5 mt-2 text-white bg-teal-700 tracking-wider font-semibold hover:shadow-2xl shadow-teal-600 hover:bg-teal-800 rounded-md '>
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    )
}