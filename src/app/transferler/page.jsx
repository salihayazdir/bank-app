const { Client } = require('pg')
import connection from '@/sql/connection'

async function getTransfers() {
  const db = new Client(connection)
  await db.connect()
   
  const query = `
  select
        trn.*,
        csr.customer_name receiver_name,
        css.customer_name sender_name,
        tyr.acc_type_name receiver_account_type,
        tys.acc_type_name sender_account_type
    from
        transaction_table trn
        left join account acr
            on trn.receiver_account_id = acr.account_number
        left join account acs
            on trn.sender_account_id = acs.account_number
        left join customer csr
            on acr.customer_id = csr.id
        left join customer css
            on acs.customer_id = css.id
        left join account_type tyr
            on acr.account_type_id = tyr.id
        left join account_type tys
            on acs.account_type_id = tys.id
    order by trn.tran_time desc
  `
  const res = await db.query(query)
  
  await db.end()
  console.log(res.rows[0])
  return res.rows
}

export default async function TransfersPage() {
    const transfers = await getTransfers()
    return (
        <div className='flex flex-col w-full gap-6' >
            <h1 className='pb-2 text-xl font-semibold text-orange-700 border-b border-orange-600'>Para Transferleri</h1>
            <div className='flex flex-col gap-6' >
                {transfers.map(transfer => {
                        const tranDate = new Date(transfer.tran_time)
                        return (
                            <div className='flex flex-col gap-2 p-6 border border-gray-100 rounded-lg shadow-lg' >
                                <span>{`Gönderen: ${transfer.sender_name}`}</span>
                                <span>{`Gönderen Hesap No: ${transfer.sender_account_id}`}</span>
                                <span>{`Gönderen Hesap Türü: ${transfer.sender_account_type}`}</span>
                                <span>{`Alıcı: ${transfer.receiver_name}`}</span>
                                <span>{`Alıcı Hesap No: ${transfer.receiver_account_id}`}</span>
                                <span>{`Alıcı Hesap Türü: ${transfer.receiver_account_type}`}</span>
                                <span>{`Miktar: ${transfer.amount} ${transfer.sender_account_type}`}</span>
                                <span>{`Transfer Tarihi: ${tranDate.toLocaleString("tr-TR")}`}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}