INSERT INTO Customer
    (customer_name,tckn,bdate,parent_id,registration_date)
    VALUES 
    ('Burak Katı', 55566677711, '1971-07-13', NULL,'2023-01-01'),
    ('Salih Ayazdır', 32884848472, '1991-07-13', NULL,'2023-05-09'),
    ('Mehmet Kubur', 39884884272, '1991-07-13', NULL,'2023-05-09'),
    ('Ahmet Ayazdır', 12884848472, '2008-07-13', 2,'2023-05-09');

INSERT INTO Credit_Card
    (customer_id, contactless, card_limit, balance, due_date, ccv, card_number)
    VALUES
    (1, '1', 50000, -15000, '2027-06-01', 123, 6234759852),
    (2, '1', 25000, -20000, '2029-01-01', 467, 7385927584);

INSERT INTO Account_Type
    (acc_type_name,try_multiplier)
    VALUES
    ('TRY', 1),
    ('ALT', 1250),
    ('USD', 25.21),
    ('EUR', 28.36);

INSERT INTO Branch
    (branch_name,city,branch_address,postal_code)
    VALUES
    ('Şişli Şube', 'İstanbul', 'Halaskargazi Caddesi', 34034),
    ('Ataşehir Şube', 'İstanbul', 'Turgut Özal Bulvarı', 34107),
    ('Kozyatağı Şube', 'İstanbul', 'Kozyatağı Caddesi No.1', 34107);

INSERT INTO Account
    (customer_id,account_type_id,balance,branch_id,account_number,opening_date,expiration_date)
    VALUES
    (1, 1, 20000.00, 1, 1111, '2019-07-13','2029-05-01'),
    (1, 2, 99235.69, 1, 2222, '2021-07-13','2033-05-01'),
    (2, 1, 112.2, 2, 3333, '2021-07-13','2023-05-01'),
    (3, 1, 65893, 3, 4444, '2021-07-13','2023-05-01'),
    (3, 2, 0.78, 3, 5555, '2021-07-13','2023-05-01'),
    (3, 3, 1000, 3, 6666, '2021-07-13','2023-05-01'),
    (3, 4, 6780, 3, 7777, '2021-07-13','2023-05-01'),
    (4, 1, 0.00, 2, 8888, '2021-07-13','2023-05-01');