DROP TABLE Transaction_Table;
DROP TABLE Account;
DROP TABLE Branch;
DROP TABLE Account_Type;
DROP TABLE Credit_Card;
DROP TABLE Customer;

CREATE TABLE Customer(
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    tckn BIGINT NOT NULL,
    bdate DATE NOT NULL,
    parent_id INT REFERENCES Customer(id) NULL,
    registration_date DATE NOT NULL
);

CREATE TABLE Credit_Card(
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customer(id) NOT NULL,
    contactless BOOLEAN NOT NULL,
    card_limit REAL NOT NULL,
    balance REAL NOT NULL,
    due_date DATE NOT NULL,
    ccv INT NOT NULL,
    card_number BIGINT NOT NULL
);

CREATE TABLE Account_Type(
    id SERIAL PRIMARY KEY,
    acc_type_name VARCHAR(3) NOT NULL,
    try_multiplier INT NOT NULL
);

CREATE TABLE Branch(
    id SERIAL PRIMARY KEY,
    branch_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    branch_address VARCHAR(255) NOT NULL,
    postal_code INT NOT NULL
);

CREATE TABLE Account(
    customer_id INT REFERENCES Customer(id) NOT NULL,
    account_type_id INT REFERENCES Account_Type(id) NOT NULL,
    branch_id INT REFERENCES Branch(id) NOT NULL,
    account_number INT NOT NULL UNIQUE,
    balance REAL NOT NULL,
    opening_date DATE NOT NULL,
    expiration_date DATE NULL,
        PRIMARY KEY (customer_id, account_type_id)
);

CREATE TABLE Transaction_Table(
    id SERIAL PRIMARY KEY,
    receiver_account_id INT REFERENCES Account(account_number) NOT NULL,
    sender_account_id INT REFERENCES Account(account_number) NOT NULL,
    amount REAL NOT NULL,
    tran_time TIMESTAMP NOT NULL,
    tran_description VARCHAR(255) NULL
);