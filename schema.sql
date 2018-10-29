-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products(
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

VALUES ("WIRELESS MOUSE", "ELECTRONICS", 10.00, 100), ("PORTABLE POWER BANK", "ELECTRONICS", 29.99, 50), ("STANDARD HEADPHONES", "ELECTRONICS",3.25, 75), ("IPHONE 6 PLUS CASE COVER", "ELECTRONICS", 1.50, 30), ("LENOVO E580 I7 500 GB LAPTOP", "ELECTRONICS", 899.99, 20), ("ZICO COCONUT WATER 250ML", "GROCERY ", 0.99, 500), ("SPARKLING WATER 500ML", "GROCERY ", 0.99 , 750), ("HOT WATER THERMOS", "KITCHEN", 9.99, 50), ("HOT SOUP CONTAINER", "KITCHEN", 14.99, 60), ("PORTABLE LUNCHBOX", "KITCHEN", 19.99, 20);

SELECT * from bamazon_db.product;