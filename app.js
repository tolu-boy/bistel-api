 const express = require('express');
 const moongose = require('mongoose')
 const bodyParser = require('body-parser');
 const path = require('path');
 const cors = require('cors')

 // initiaize the app

 const app = express();

 // middle ware

 // form data middleware
 app.use(bodyParser.urlencoded({
     extended: false
 }));

 // json body middleware
 app.use(bodyParser.json());

 // cors middleware
 app.use(cors());
 // setting up static directory
 app.use(express.static(path.join(__dirname, 'public')));

 //connect to db and config keys

 const db = require('./config/keys').mongoURI
 moongose.connect(db, { useNewUrlParser: true }).then((
     console.log(`database connected successfully to ${db}`)
 )).catch(err => {
     console.log(`unable to connect to db ${err}`);
 });


 //  app.get('/', (req, res) => {
 //      return res.send('<h1>Hello worlds <h1>')
 //  });

 const users = require('./routes/api/users');
 app.use('/api/users', users);


 // spin up the server
 const PORT = process.env.PORT || 5000;

 app.listen(PORT, () => {
     console.log(`server started on port ${PORT}`);
 });