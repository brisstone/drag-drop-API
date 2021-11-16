const express = require("express");
const database = require('./db');
var cors = require('cors');
require('dotenv').config({path:'.env'});
var bodyParser = require('body-parser')

const app = express();

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is up and running on ${port}..`);
});


 // To add Days
  var date = new Date();
  // new Date().toISOString().slice(0, 19).replace('T', ' ');
  date.setDate(date.getDate() + 7);
  var sevenDays = date.toISOString().slice(0, 19).replace('T', ' ')

  console.log('g',sevenDays)



app.get("/", cors(), (req, res, next) => {

 res.send("WELCOME, USE METHODS")
  
});

app.get("/api/customers", cors(), (req, res, next) => {

  database.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    res.json(result)

  });

 
});


app.get("/api/planner", (req, res) => {

  database.query("SELECT * FROM planner", function (err, result, fields) {
    if (err) throw err;
    res.json(result)

  });
})



app.post("/api/planner", cors(), async (req, res) => {
  // Function to insert single row values in
  // the database

  // To add Days
   var date = new Date();
  new Date().toISOString().slice(0, 19).replace('T', ' ');
  date.setDate(date.getDate() + 7);
  var sevenDays = date.toISOString().slice(0, 19).replace('T', ' ')

  console.log('g',sevenDays)
  
  // console.log(sevenDays)

  try {
    if (!req.body == undefined) {
        console.log('no data sent')
        res.send('failure')
        
    } else {
      const Customer_Name = req.body.updatePlanner[0].Customer_Name
        const Pick_Up_Location = req.body.updatePlanner[0].Pick_Up_Location
        const Drop_off_Location = req.body.updatePlanner[0].Drop_off_Location
        // console.log(Customer_Name)
        // console.log(Pick_Up_Location)
        // console.log(Drop_off_Location)

      console.log(sevenDays)
      let query = `INSERT INTO planner
    (Customer_Name, Pick_Up_Location, Drop_off_Location, date) VALUES (?, ?, ?, ?);`;


      // Creating queries
      database.query(query, [Customer_Name,
        Pick_Up_Location, Drop_off_Location,  sevenDays], (err, rows) => {
          if (err) throw err;
          
          console.log("Row inserted with id = "
            + rows.insertId);
          console.log(rows)
          res.send("success")
        });

    }

  } catch (e){
    console.log('llllllllllllllllllllllllllllllllll',e)
    res.send('failure')
  }
  






});



