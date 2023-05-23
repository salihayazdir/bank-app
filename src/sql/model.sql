DROP TABLE Credit_Card;
DROP TABLE Customer;
DROP TABLE Account_Type;
DROP TABLE Branch;
DROP TABLE Account;
DROP TABLE Transaction_Table;

CREATE TABLE Customer(
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    tckn BIGINT NOT NULL,
    bdate DATE NOT NULL,
    inviter_id INT REFERENCES Customer(id) NULL,
    registration_date DATE NOT NULL
);

CREATE TABLE Credit_Card(
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customer(id) NOT NULL,
    contactless BOOLEAN NOT NULL,
    card_limit REAL NOT NULL,
    balance REAL NOT NULL,
    due_date DATE NOT NULL,
    expiration_month INT NOT NULL,
    expiration_year INT NOT NULL,
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
    balance REAL NOT NULL,
    branch_id INT NOT NULL,
    account_type VARCHAR(255) NOT NULL,
    opening_date DATE NOT NULL,
    expiration_date DATE NULL,
        PRIMARY KEY (customer_id, account_type_id)
);

CREATE TABLE Transaction_Table(
    id SERIAL PRIMARY KEY,
    receiver_account_id INT REFERENCES Account_Type(id) NOT NULL,
    sender_account_id INT REFERENCES Account_Type(id) NOT NULL,
    tran_time TIMESTAMP NOT NULL,
    tran_description VARCHAR(255) NOT NULL
);