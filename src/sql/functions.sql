create or replace function
    transferMoney(receiver int, sender int, amount real, description varchar)
returns varchar
as
$$
declare returnId int := 0;
declare receiverBalance real;
declare receiverMultiplier real;
declare senderBalance real;
declare senderMultiplier real;

begin
    if amount < 0
        then return 'Miktar negatif olamaz.';
        end if;
        
    select balance into receiverBalance
        from account
        where account_number = receiver;
        
    select balance into senderBalance
        from account
        where account_number = sender;
    
    if senderBalance - amount  < 0
        then return 'Hesap bakiyeniz yetersiz.';
        end if;
        
    select ty.try_multiplier into senderMultiplier
        from account ac
        left join account_type ty
            on ac.account_type_id = ty.id
        where
            ac.account_number = sender;
            
    select ty.try_multiplier into receiverMultiplier
        from account ac
        left join account_type ty
            on ac.account_type_id = ty.id
        where
            ac.account_number = receiver;
    
    update account
        set balance = receiverBalance + amount * senderMultiplier
        where account_number = receiver;
    
    update account
        set balance = senderBalance - amount
        where account_number = sender;

    insert into transaction_table
        (receiver_account_id, sender_account_id, amount, tran_time, tran_description)
    values
        (receiver, sender, amount, now(), description)
    returning id into returnId;

    return concat('Transfer başarılı. Transfer ID:', returnId);
end;
$$
language plpgsql;