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

// login 
app.post('/login', (req, res)=>{

    const body = {
        username: req.body.username,
        password: req.body.password
    }



    fetch('http://127.0.0.1:3000/login',{
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })


    .then(res => res.json())
    .then(json => {
        if(json.status === 200){
            jwt.sign(body, 'secretKey', (err, token) =>{
                if(!err){
                    res.send({
                        status: 200,
                        mensaje: "Inicio de sesion exitoso!.",
                        token: token
                    })
                } else {
                    res.send({
                        status: 100,
                        mensaje: "Inicio de sesion fallido. Vuelve a intentarlo"
                    })
                }
            })
        } else {
            res.send(json)
        }
    });

})

// register

app.post('/register', (req, res)=>{

    const body = {
        username: req.body.username,
        password: req.body.password
    }

    fetch('http://127.0.0.1:3000/register',{
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    })

    .then(res => res.json())
    .then(json => res.send(json));


})

// obtener peliculas

app.get('/movies', verifyToken, (req, res)=>{
    console.log(req.token)
    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
            
        } else{
            fetch('http://127.0.0.1:4200/movies', {
                method: 'get'
            })
            .then(res => res.json())
            .then(json => res.send(json))
        }
    })
})

// obtener una pelicula en especifico

app.get('/movies/:movieId', verifyToken, (req, res)=>{

    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
            
        } else{

            fetch(`http://127.0.0.1:4200/movies/${req.params.movieId}`, {
                method: 'get'
            })
            .then(res => res.json())
            .then(json => res.send(json))
        }
    })
})

// agregar pelicula

app.post('/movies', verifyToken, (req, res)=>{

    const body = req.body

    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
            
        } else{
            fetch('http://127.0.0.1:4200/movies',{
                method: 'post',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => res.send(json))
        }
    })
})

// modificar pelicula

app.put('/movies/:movieId', verifyToken, (req, res)=>{

    const body = req.body

    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
            
        } else{
            fetch(`http://127.0.0.1:4200/movies/${req.params.movieId}`,{
                method: 'put',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => res.send(json))
        }
    })
})

// eliminar pelicula
app.delete('/movies/:movieId', verifyToken, (req, res)=>{

    const body = req.body

    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if(err){
            res.sendStatus(403);
            
        } else{
            fetch(`http://127.0.0.1:4200/movies/${req.params.movieId}`,{
                method: 'delete'
            })
            .then(res => res.json())
            .then(json => res.send(json))
        }
    })
})
// verificando token

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}  


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
