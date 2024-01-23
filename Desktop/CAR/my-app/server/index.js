const express = require('express');
var mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
const port = 5000;

//const port = 51944;

app.use(cors("*"));
var connection = mysql.createConnection({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'dG2C33aDAa4hh1BHc-G51ddfBFeG34ec',
    database: 'railway',
    port:'51944'
    // host:'localhost',
    // user:'root',
    // password:'Mehar.2001',
    // database: 'Corp',
    // port: '3306'
});

connection.connect(function(error){
    if(error){
        console.error('Error: ', error);
    }
    else{
        console.log('Connected');
    }
});


app.get('/api/data', (req, res) => {
    console.log('Received request with query parameters:', req.query);
    const colors=req.query.color;

   const minPrice=req.query.minPrice;
   const maxPrice=req.query.maxPrice;
   
    const minMile=req.query.minMile;
    const maxMile=req.query.maxMile;

    try {
        let filter=[];
    var sql=`SELECT * FROM Marketplace_Inventory JOIN OEM_Specs ON (OEM_Specs.car_id = Marketplace_Inventory.car_id) WHERE 1=1`;
    //if(colors){
    if(colors==="All"){
        // filter.push(colors);
        // //sql += ` AND color= "${req.query.color}"`;
        // var sql=`SELECT * FROM Marketplace_Inventory JOIN OEM_Specs ON (OEM_Specs.car_id = Marketplace_Inventory.car_id) WHERE 1=1`;
    }
    else{
        filter.push(colors);
        sql+=` AND color = "${req.query.color}"`;
    }

    if(minMile && maxMile){
        filter.push(minMile);
        filter.push(maxMile);
        sql += ` AND mileage BETWEEN ${req.query.minMile} AND ${req.query.maxMile}`;
    }
    
    if(minPrice && maxPrice){
        filter.push(minPrice);
        filter.push(maxPrice);
        console.log(`minPrice: ${minPrice}, maxPrice: ${maxPrice}`);
        sql += ` AND list_price BETWEEN ${req.query.minPrice} AND ${req.query.maxPrice}`;
    }
    console.log(sql);
    connection.query(sql, filter, (err, result) => {
    if (err) {
        console.log(err)
      res.status(500).send(err);
      return;
    }
    console.log(result);
    res.send(result);

  });
    } catch (error) {
        console.log(error)
    }
    
    
});

app.get('/api/count', (req,res) => {
    let sql = 'SELECT COUNT(*) AS count FROM OEM_Specs';
    connection.query(sql, (error, results, fields) => {
        if(error){
            console.log(error);
            res.status(500).send(error,message);
            return;
        }
        res.json(results);
    });
});

app.get('/api/search', (req, res) => {
    const searchQuery = req.query.search;

    try {
        
    if(searchQuery!==null && searchQuery!==''){
    let sql = `SELECT * FROM OEM_Specs JOIN Marketplace_Inventory ON (OEM_Specs.car_id = Marketplace_Inventory.car_id) WHERE model_name="${searchQuery}"`;
    
    connection.query(sql, (error, results, fields) => {
        if(error){
            console.log(error);
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
    }
    else{
        let sql = `SELECT * FROM OEM_Specs JOIN Marketplace_Inventory ON (OEM_Specs.car_id = Marketplace_Inventory.car_id) WHERE 1=1`;
    //console.log(sql);
    connection.query(sql, (error, results, fields) => {
        if(error){
            console.log(error);
            res.status(500).send(error);
            return;
        }
        res.send(results);
    });
    console.log(sql);
    }
    } catch (error) {
        console.log(error)
    }
    
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', function () {
    connection.end(function () {
        console.log('MySQL connection has been closed.');
        process.exit();
    });
});