const express = require('express');
const mongoose = require('mongoose');
const port = 4000;
const fetch = require('node-fetch');
const app = express();
const jwt = require('jsonwebtoken');


// config del body-parser
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// config bd
mongoose.connect("mongodb://localhost:27017/users", { useUnifiedTopology: true, useNewUrlParser: true });

// // login 
// app.post('/login', (req, res)=>{

//     const body = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     fetch('http://127.0.0.1:3000/login',{
//         method: 'post',
//         body: JSON.stringify(body),
//         headers: {'Content-Type': 'application/json'}
//     })


//     .then(res => res.json())
//     .then(json => res.send(json));

// })

// // register

// app.post('/register', (req, res)=>{

//     const body = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     fetch('http://127.0.0.1:3000/register',{
//         method: 'post',
//         body: JSON.stringify(body),
//         headers: {'Content-Type': 'application/json'}
//     })

//     .then(res => res.json())
//     .then(json => res.send(json));


// })


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
