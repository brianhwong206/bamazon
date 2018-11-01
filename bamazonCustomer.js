var mysql = require("mysql"); // remember to npm install mysql
var inquirer = require("inquirer"); // remember to npm install inquirer

//var choiceArray = [];

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
  //populateArray();
  showItems();
});

function showItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var results = res;
    console.log("\n====Beginning of List====");
    console.log("\n Total Items Returned: " + results.length);

    for (var i = 0;  i < results.length; i++) {
        console.log ("\n Item Id: " + results[i].item_id + 
        "\n Product Name: " + results[i].product_name + 
        "\n Department Name: " + results[i].department_name  +
        "\n Price: " + results[i].price +
        "\n Stock Quantity: " + results[i].stock_quantity
        );
    };
    console.log("\n====End of List====");
    
    //connection.end();
    askUser();
    
  });
}

function askUser() {
    inquirer.prompt([
        {
        name: "itemToBuy",
        type: "rawlist",
        message: "Which item_id would you like to purchase today?",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] // hardcoded, needs to be dynamic.
    },
    {
        name: "quantityRequested",
        type: "input",
        message: "How much would you like to purchase?",
        //check to see if input is a number
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }
]).then(answers => {
        // Use user feedback for... whatever!!
        var requestedItem = answers.itemToBuy;
        var requestedQuantity = parseInt(answers.quantityRequested); // convert string type to int and store as variable

        connection.query("SELECT * FROM products WHERE item_id = ?",[requestedItem], function(err, res) {
            if (err) throw err;
            var results = res;

            for (var i = 0; i < results.length; i++){

            var resultsTotalQuantity = parseInt(results[i].stock_quantity); // convert string type to int and store as variable

            console.log("\n Inventory currently has: " + resultsTotalQuantity);
            console.log("\n User wants to buy a quantity of: " + requestedQuantity);

            if (resultsTotalQuantity >= requestedQuantity) {
                console.log("\n There are enough items in stock to satsify the user's request. Yay! \n")
            }else{
                console.log("\n Sorry. Insufficient Quantity. There are not enough items in stock to fulfill the user's request. \n ")
            }

            }
            connection.end(); // terminate connection SQL database
        });
    });
}      
        

