const express = require('express');
var mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
const port = 5000;


app.use(cors("*"));
const pool = mysql.createPool({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'dG2C33aDAa4hh1BHc-G51ddfBFeG34ec',
    database: 'railway',
    port:'51944',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    // host:'localhost',
    // user:'root',
    // password:'Mehar.2001',
    // database: 'Corp',
    // port: '3306'
});


pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL');
    })
    .catch(error => {
        console.error('Error connecting to MySQL:', error);
    });


app.get('/api/data', async (req, res) => {
    console.log('Received request with query parameters:', req.query);
   
    try {
        const colors=req.query?.color;

        const minPrice=req.query?.minPrice ;
        const maxPrice=req.query?.maxPrice;
        
         const minMile=req.query?.minMile;
         const maxMile=req.query?.maxMile;
     
        let filter=[];
    var sql=`SELECT * FROM Marketplace_Inventory JOIN OEM_Specs ON (OEM_Specs.car_id = Marketplace_Inventory.car_id) WHERE 1=1`;
    if(colors==="All"){
        
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
    const [results]  = await pool.query(sql, filter);
    res.send(results);

    } catch (error) {
        res.send(error);
    }
});

// app.get('/api/count', await (req,res) => {
//     let sql = 'SELECT COUNT(*) AS count FROM OEM_Specs';
//     connection.query(sql, (error, results, fields) => {
//         if(error){
//             console.log(error);
//             res.status(500).send(error);
//             return;
//         }
//         res.send(results);
//     });
// });

app.get('/api/search', async (req, res) => {

    try {
       const searchQuery = req.query.search;
        let sql;
    if(searchQuery!==null && searchQuery!==''){
     sql = `SELECT * FROM OEM_Specs JOIN Marketplace_Inventory ON (OEM_Specs.car_id = Marketplace_Inventory.car_id) WHERE model_name LIKE "%${searchQuery}%" OR yearOfModel LIKE "%${searchQuery}%"`; 
    }
    else{
        sql = 'SELECT * FROM OEM_Specs JOIN Marketplace_Inventory ON (OEM_Specs.car_id = Marketplace_Inventory.car_id) WHERE 1=1';
    }
    console.log(sql);
    const [results] = await pool.query(sql, [searchQuery]);
    res.status(200).send(results);
}
     catch (error) {
        console.error(error);
    res.status(500).send(error);
    }
    
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
