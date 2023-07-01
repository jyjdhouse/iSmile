CREATE TABLE CATEGORIES 
(id int primary key auto_increment,
 category varchar(255)
);

CREATE TABLE USERS (
	id int primary key auto_increment,
    first_name varchar(255),
    last_name varchar(255),
    phone varchar(100),
    dni varchar(8)
);

CREATE TABLE ADDRESSES (
	id int primary key auto_increment,
    street varchar(255),
	city varchar(100),
    province varchar(100),
    zip_code varchar(10),
    user_id int,
    foreign key(user_id) references USERS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE PRODUCTS (
	id int primary key auto_increment,
    name varchar(255),
	price varchar(100),
    province varchar(100),
    description text,
    category_id int,
    foreign key(category_id) references CATEGORIES(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE PRODUCTS_IMAGES (
	id int primary key auto_increment,
    image varchar(255),
    product_id int,
    foreign key(product_id) references PRODUCTS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

INSERT INTO USERS VALUES
(DEFAULT, 'Joaquin', 'Usuario', '1160789254', '48501245', '1', 'Admin123', 'joaquin@gmail.com');

INSERT INTO ADDRESSES VALUES
(DEFAULT, 'Calle 123', 'Quilmes', 'Buenos Aires', '1878', 1);

CREATE TABLE ORDERS (
	id int primary key auto_increment,
    user_id int,
    foreign key(user_id) references USERS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    total DECIMAL(10,2),
    address_id int,
    foreign key(address_id) references ADDRESSES(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    createdAt date,
    deletedAt date,
    updatedAt date
);

CREATE TABLE ORDER_ITEM (
	id int primary key auto_increment,
    order_id int,
    foreign key(order_id) references ORDERS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    product_id int,
    foreign key(product_id) references PRODUCTS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    name varchar(255),
    price decimal(10,2),
    quantity decimal(10,2),
    createdAt date,
    deletedAt date,
    updatedAt date
);

CREATE TABLE TEMPORAL_CART (
	id int primary key auto_increment,
    user_id int,
    foreign key(user_id) references USERS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE TEMPORAL_ITEMS (
	id int primary key auto_increment,
    temporal_cart_id int,
    foreign key(temporal_cart_id) references TEMPORAL_CART(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
	product_id int,
    foreign key(product_id) references PRODUCTS(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    quantity int
);

