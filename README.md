# bamazon

bamazon
bamazonCustomer.js and bamazonManager.js are a demonstration of incorporating MySQL with Javascript.

Getting Started:
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites:
You will need to npm install the following items prior to running the program:
npm mysql
npm inquirer

bamazonCustomer.js
This file will demonstrate the basic concepts of referencing data stored on a MySQL server. When the file is run, all items are displayed with the showItems function. The user is then prompted with the askUser function which askes the user which item_id they would like to purchase and the quantity of items the would like to purchase. The file checks with the database to confirm if there are enough items available in inventory and returns a message to affirm if there are enough items present or if current inventory does not have enough to satisfy the request.

Screenshots:
bamazonCustomer01.png - Screenshot shows the results as the bamazonCustomer.js file is executed. The inventory list is presented.
bamazonCustomer02.png - Screenshot shows at the end of the inventory list, the commands available to the user.
bamazonCustomer03.png - Screenshot shows the user selecting item_id 1 to be purchased and asking for 110 units. The response from the program returns a message indicating there are enough items in stock for the user to purchase.
bamazonCustomer04.png - Screen shots the user selecting item_id 1 to be purchaed and asking for 200 units. However the response the program returns a messaging informing the user there are not enough units.

bamazonManager.js
This file demonstrates more advanced understanding of MySQL with Javascript while operating in the terminal. This file contains 3 functions that will allow the user to view existing inventory, view inventory with low quantities, and add items into inventory. NPM inquirer allows the user to select which path to take and to input values they wish to add. 

Screenshots:
bamazonManager01.png - When the program is launched, the user is presented with a selection of actions.
bamazonManager02.png - Screenshot shows the result if the user has selected the show inventory option.
bamazonManager03.png - Screenshot shows the result if the user has selected the show low inventory option.
bamazonManager04.png - Screeshot shows the result if the user selects add inventory option. They are prompted to identify which item to add inventory into and how many items to add. They are also presented the old inventory value and the new inventory value.

Built With
VSCode - Text Editor

Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

Authors
Brian Wong - Initial work 
