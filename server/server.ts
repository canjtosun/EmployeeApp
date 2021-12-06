const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


const db = mysql.createConnection({
  host:'sql3.freesqldatabase.com',
  user:'sql3456193',
  password:'SjlUbvnrCr',
  database:'sql3456193',
  port:3306
});

db.connect( err=> {
  if(err){
    console.log(err, 'dberr');
  }
  console.log('connected');
});

app.get('/EmployeeTable', (req,res) => {
    let qr = 'select * from EmployeeTable';
    db.query(qr, (err,result) => {
      if(err) console.log(err, 'error');
      if(result.length > 0){
        res.send({
          data:result
        });
      }
    })
});



app.listen(3000, ()=> {
  console.log('server running ...')
});

