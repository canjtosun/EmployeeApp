/*
mysql2 notes:
get has query or param
post has body
put has body
delete has nothing
*/

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//create connection with fields
const db = mysql.createConnection({
  host: 'sql3.freesqldatabase.com',
  user: 'sql3456193',
  password: 'SjlUbvnrCr',
  database: 'sql3456193',
  port: 3306,
});

//check if its connected or not
db.connect((err) => {
  if (err) {
    console.log(err, 'dberr');
  }
  console.log('connected');
});

//get info from table
app.get('/EmployeeTable', (_, res) => {
  let qr = 'SELECT * FROM EmployeeTable';
  db.query(qr, (err, result) => {
    if (err) console.log(err, 'error');
    if (result.length > 0) {
      res.send(result);
    }
  });
});

//get info from table with id
app.get('/EmployeeTable/:id', (req, res) => {
  let qr = `SELECT * FROM EmployeeTable WHERE id = ${req.params.id}`;
  db.query(qr, (err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.send(result);
  });
});

//insert info to the table
app.post('/EmployeeTable', (req, res) => {
  for (const key in req.body) {
    if (
      key != 'id' &&
      req.body[key] &&
      (req.body[key].includes('"') || req.body[key].includes("'"))
    ) {
      return res.status(400).send({ message: 'wrong format' });
    }
  }
  //get the info
  const correct_body = [
    req.body?.first_name,
    req.body?.last_name,
    req.body?.company_name,
    req.body?.address,
    req.body?.city,
    req.body?.county,
    req.body?.postal,
    req.body?.phone,
    req.body?.email,
    req.body?.web,
    req.body?.pic,
  ].map((value) => { //no matter what, we should add "" start and end
    return '"' + value + '"';
  });
  let qr = `INSERT INTO
  EmployeeTable(first_name, last_name, company_name, address, city,
    county, postal, phone, email, web, pic) VALUES (${correct_body})`;
  db.query(qr, (err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.send(result);
  });
});

//update info
app.put('/EmployeeTable/:id', (req, res) => {
  if (!req.body?.id) {
    return res.status(400).send({ message: 'wrong format' });
  }
  for (const key in req.body) {
    if (
      key != 'id' &&
      req.body[key] &&
      (req.body[key].includes('"') || req.body[key].includes("'"))
    ) {
      return res.status(400).send({ message: 'wrong format' });
    }
  }
  let qr = `UPDATE EmployeeTable SET first_name = "${req.body?.first_name}", last_name = "${req.body?.last_name}",
    company_name = "${req.body?.company_name}", address = "${req.body?.address}", city = "${req.body?.city}",
    county = "${req.body?.county}", postal = "${req.body?.postal}", phone = "${req.body?.phone}",
    email = "${req.body?.email}", web = "${req.body?.web}", pic = "${req.body?.pic}"
    WHERE id = ${req.body?.id}`;
  db.query(qr, (err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.send(result);
  });
});

//delete info from table
app.delete('/EmployeeTable/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: 'wrong format' });
  }
  let qr = `DELETE FROM EmployeeTable WHERE id = ${escape(req.params.id)}`;
  db.query(qr, (err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    return res.send(result);
  });
});

//app listen
app.listen(3000, () => {
  console.log('server running ...');
});
