-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE product(
  -- Makes a INT column called "item_ID" which cannot contain null, item_id (unique id for each product)--
  item_id INT NOT NULL AUTO_INCREMENT,
  -- Makes a VARCHAR column called "product_name" which cannot contain null, product_name (Name of product) --
  product_name VARCHAR(60) NOT NULL,
  -- Makes a VARCHAR column called "department_name", department_name --
  department_name VARCHAR(30),
  -- Makes an DECIMAL column called "price", price (cost to customer) --
  price DECIMAL(10,2),
  -- Makes an INT column called "stock_quantity", stock_quantity (how much of the product is available in stores) --
  stock_quantity INT(10),
  -- sets primary key as item_ID,
  PRIMARY KEY(item_id)
);


-- Insert 10 different mock products into database and table.
INSERT INTO products (product_name, department_name, price, stock_quantity)

VALUES ("Wireless Mouse", "Electronics", 10.00, 100), ("Portable Power Bank", "Electronics", 29.99, 50), ("Standard Headphones", "Electronics",3.25, 75), ("iPhone 6 Plus Case Cover", "Electronics", 1.50, 30), ("Lenovo E580 i7 500 GB Laptop", "Electronics", 899.99, 20), ("Zico Coconut Water 250ml", "Grocery ", 0.99, 500), ("Sparkling Water 500ml", "Grocery ", 0.99 , 750), ("Hot Water Thermos", "Kitchen", 9.99, 50), ("Hot Soup Container", "Kitchen", 14.99, 60), ("Portable Lunchbox", "Kitchen", 19.99, 20);

SELECT * from bamazon_db.product;