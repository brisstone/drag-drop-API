var mysql = require('mysql')
require('dotenv').config({path:'.env'});


console.log(process.env.HOST)
var db_con = mysql.createConnection({
    // host: "sql4.freemysqlhosting.net",
    // user: "sql4451197",
    // password: "FtnxyUfNzG",
    // database: "sql4451197"
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  });
  


// Connect to MySQL server
db_con.connect(async(err) => {
    try{

        if (err) {
            console.log("Database Connection Failed !!!", err);
          } else {
            console.log("connected to Database");
          }

    }catch(e){
        console.log(e)
    }
 
});


// insert into db
// var sql = "INSERT INTO `customers` (Customer_Name, Pick_Up_Location, Drop_off_Location) VALUES ('LJavo aj', 'abuja k', 'Ikeja')";
// db_con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted", result);
//   });










module.exports = db_con;