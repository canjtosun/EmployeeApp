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
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(bodyparser.json());

const uri = "mongodb+srv://briancanliam:june172021!@cluster0.fpz50.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

function connectToServer(callback){
  client.connect((err, db) => {
    if (err || !db) {
      return callback(err);
    }

    dbConnection = db.db("db");
    console.log("Successfully connected to MongoDB.");

    return callback();
  });
}

function getCollection(){
  return dbConnection.collection('EmployeeTable');
}

connectToServer((err)=>{if (err){console.log(err);}})



//get info from table
app.get('/EmployeeTable', (_, res) => {
  return getCollection()
  .find({})
  .toArray((err, result) => {
    if (err) {
      res.status(400).send("Error fetching listings!");
   } else {
      res.json(result);
    }
  });
});

//get info from table with id
app.get('/EmployeeTable/:id', (req, res) => {
  getCollection()
  .findOne({_id: req.params.id}).then((res) => {req.send(res);})
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
  // var send_db = Object.keys(req.body).reduce((filt, key) => {
  //   if (key != "id") {filt[key] = req.body[key];}
  //   return filt;
  // }, {})
  getCollection().insertOne(req.body, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting matches!");
    } else {
      getCollection().findOne({_id:result.insertedId}).then((data) => {
        res.send(data);
      })
    }
  });
  // let qr = `INSERT INTO
  // EmployeeTable(first_name, last_name, company_name, address, city,
  //   county, postal, phone, email, web, pic) VALUES (${correct_body})`;
  // db.query(qr, (err, result) => {
  //   if (err) {
  //     return res.status(400).send({ message: err });
  //   }
  //   return res.send(result);
  // });
});

// //update info
// app.put('/EmployeeTable/:id', (req, res) => {
//   if (!req.body?.id) {
//     return res.status(400).send({ message: 'wrong format' });
//   }
//   for (const key in req.body) {
//     if (
//       key != 'id' &&
//       req.body[key] &&
//       (req.body[key].includes('"') || req.body[key].includes("'"))
//     ) {
//       return res.status(400).send({ message: 'wrong format' });
//     }
//   }
//   let qr = `UPDATE EmployeeTable SET first_name = "${req.body?.first_name}", last_name = "${req.body?.last_name}",
//     company_name = "${req.body?.company_name}", address = "${req.body?.address}", city = "${req.body?.city}",
//     county = "${req.body?.county}", postal = "${req.body?.postal}", phone = "${req.body?.phone}",
//     email = "${req.body?.email}", web = "${req.body?.web}", pic = "${req.body?.pic}"
//     WHERE id = ${req.body?.id}`;
//   db.query(qr, (err, result) => {
//     if (err) {
//       return res.status(400).send({ message: err });
//     }
//     return res.send(result);
//   });
// });

// //delete info from table
// app.delete('/EmployeeTable/:id', (req, res) => {
//   if (!req.params.id) {
//     return res.status(400).send({ message: 'wrong format' });
//   }
//   let qr = `DELETE FROM EmployeeTable WHERE id = ${escape(req.params.id)}`;
//   db.query(qr, (err, result) => {
//     if (err) {
//       return res.status(400).send({ message: err });
//     }
//     return res.send(result);
//   });
// });

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`)
});
