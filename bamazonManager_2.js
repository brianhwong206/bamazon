var mysql = require("mysql"); // remember to npm install mysql
var inquirer = require("inquirer"); // remember to npm install inquirer

var arrayChoices = [];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "sonic", // weak password! hedgehog
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // plan to have the data pull down the necessary data and store it here before calling the functions.
  selectOptions();
});

 var itemArray = (arr) => {
    arr = []; // set array to blank
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        //var itemArrayResults = res; // JSON
        else {return res};
    }).then (itemArrayResults =>{ // this is the response after successful promise.
        for (var i = 0;  i < itemArrayResults.length; i++) {
            //console.log(itemArrayResults[i].item_id);
            arr.push(itemArrayResults[i].item_id); // fill array
        }
        //console.log("Item array results: ", itemArrayResults);
        //console.log(arr);
        return arr;
    })
}

function selectOptions(){
    inquirer.prompt([/* Pass your questions in here */
        {
            name: "select",
            type: "rawlist",
            message: "What option would you like to choose today?",
            choices: ["Display Items", "Display Low Inventory", "Add to Inventory", "Add New Product"]
        }
    
    ]).then(answers => {
        // Use user feedback for... whatever!!

        console.log(answers.select);

        switch (answers.select) {
            case "Display Items":
                showItems();
                break;
            case "Display Low Inventory":
                showLowInventory();
                break;
            case "Add to Inventory":
                var a = itemArray(arrayChoices);
                console.log("Switch items: " + a);
                addToInventory(a);
                break;
            case "Add New Product":
    
                //addNewProduct();
                break;
            default:
                break;
        }
    })
};

function showItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var showItemsResults = res;
    console.log("\n====Beginning of Full Inventory List====");
    console.log("\n Total Items Returned: " + showItemsResults.length);

    for (var i = 0;  i < showItemsResults.length; i++) {
        console.log ("\n Item Id: " + showItemsResults[i].item_id + 
        "\n Product Name: " + showItemsResults[i].product_name + 
        "\n Department Name: " + showItemsResults[i].department_name  +
        "\n Price: " + showItemsResults[i].price +
        "\n Stock Quantity: " + showItemsResults[i].stock_quantity
        );
    };
    console.log("\n====End of Full Inventory List====");
    
    connection.end(); 
  });
}

function showLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 25", function(err, res) {
        if (err) throw err;
        var lowInventoryResults = res;
        console.log("\n====Beginning of Low Inventory List====");
        console.log("\n Total Items Returned: " + lowInventoryResults.length);
        console.log("\n Low Inventory Count: 25");

        for (var i = 0;  i < lowInventoryResults.length; i++) {
            console.log ("\n Item Id: " + lowInventoryResults[i].item_id + 
            "\n Product Name: " + lowInventoryResults[i].product_name + 
            "\n Department Name: " + lowInventoryResults[i].department_name  +
            "\n Price: " + lowInventoryResults[i].price +
            "\n Stock Quantity: " + lowInventoryResults[i].stock_quantity
            );
        };
        console.log("\n====End of Low Inventory List====");
        
        connection.end(); 
    });
}

// ask user what product they would like to add inventory to
// ask user how much they would like to add
function addToInventory(arr) {

    inquirer.prompt([/* Pass your questions in here */
        {
            name: "addToInventoryID",
            type: "rawlist",
            message: "Which item_id would you like to add inventory into today?",
            choices: arr
            //choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] // hardcoded, needs to be dynamic. // test
        },{
            name: "addToInventoryQuantity",
            type: "input",
            message: "How much quantity would you like to add today?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            } 
        }
    ]).then(answers => {
        var addToInventoryItemID = answers.addToInventoryID;
        var addToInventoryQuantityAmount = parseInt(answers.addToInventoryQuantity);

        console.log("\n User has selected ID: " + addToInventoryItemID);
        console.log("\n User would like to add a quantity of: " + addToInventoryQuantityAmount)

        connection.query("SELECT * FROM products WHERE item_id = ?",[addToInventoryItemID], function(err, res) {
            if (err) throw err;
            var addToInventoryResults = res;
            var currentInventoryCount; // new variable created called current inventory 
            var newInventoryCount; // new variable created called new inventory

            console.log("\n====Beginning of Updated Inventory List====");
            console.log("\n Total Items Returned: " + addToInventoryResults.length);
            
            for (var i = 0;  i < addToInventoryResults.length; i++) {
                currentInventoryCount = addToInventoryResults[i].stock_quantity;
                console.log("Old Inventory Count: " + currentInventoryCount);

                newInventoryCount = parseInt(currentInventoryCount) + addToInventoryQuantityAmount;
                console.log("New Inventory Count: " + newInventoryCount);

                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[newInventoryCount, addToInventoryItemID], function(err, res) {
                    if (err) throw err;
                    var updatedInventoryResults = res;

                    for (var i = 0;  i < updatedInventoryResults.length; i++) {
                        console.log ("\n Item Id: " + updatedInventoryResults[i].item_id + 
                        "\n Product Name: " + updatedInventoryResults[i].product_name + 
                        "\n Department Name: " + updatedInventoryResults[i].department_name  +
                        "\n Price: " + updatedInventoryResults[i].price +
                        "\n Stock Quantity: " + updatedInventoryResults[i].stock_quantity
                        );
                    };
                });
            };
            console.log("\n====End of Updated Inventory List====");
            connection.end();
        });
    });
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "itemNameToAdd",
            type: "input",
            message: "What is the name of the item would you like to add?" 
            //validate no null?
        },{
            name: "itemDepartmentToAdd",
            type: "input",
            message: "What department does your item classify into?"
            //validate?
        },{
            name: "itemPriceToAdd",
            type: "input",
            message: "What is the list price of your item?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },{
            name: "itemStockToAdd",
            type: "intput",
            message: "How many initial units would you like to begin with?"
            //validate?
        }
    ]).then(answers => {
        var newItemName = (answers.itemNameToAdd).toUpperCase();
        var newItemDepartment = (answers.itemDepartmentToAdd).toUpperCase();
        var newItemPrice = parseFloat(answers.itemPriceToAdd).toFixed(2);
        var newItemQuantityStock = parseInt(answers.itemStockToAdd);

        console.log("\n====Beginning of New Item Add====");
        console.log(answers);
        console.log("\n====End of New Item Add====");

        console.log("====test====");
        console.log(newItemName);
        console.log(newItemDepartment);
        console.log(newItemPrice);
        console.log(newItemQuantityStock);
        console.log("====end test====");

        // connection.query(
        //     "INSERT INTO products SET product_name = ? department_name = ? price = ? stock_quantity = ?",[newItemName, newItemDepartment, newItemPrice, newItemQuantityStock]
        //   );
        //   function(err, res) {
        //     if (err) throw err;
        //     console.log("====test====");
        //     console.log(newItemName);
        //     console.log(newItemDepartment);
        //     console.log(newItemPrice);
        //     console.log(newItemQuantityStock);
        //     console.log("====end test====")
        //   }
        connection.end();
    })
}