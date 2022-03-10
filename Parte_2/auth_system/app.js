const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const userSchema = require(__dirname + "/models/Users.js");
const port = 3000
const app = express();

// config del body-parser
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// config bd
mongoose.connect("mongodb://localhost:27017/users", { useUnifiedTopology: true, useNewUrlParser: true });
const User = userSchema.getUser();

// endpoint para registrar usuario
app.post('/register', (req, res)=>{
   
    const username = req.body.username;
    const password = req.body.password;
    
    const newUser = new User({
        username: username,
        password: password
    })

    newUser.save((err)=>{
        
        if(err){
            console.log('Error al crear el usuario')
            console.log(err)
            res.send({
                Status: 100,
                mensaje: "Hubo un error al crear tu usuario, intentalo de nuevo.",
              });
        } else{
            console.log('Usuario creado exitosamente')
            res.send({ Status: 200, mensaje: "Usuario creado Exitosamente!." });
        }
    })

})


// login de usuario
app.post('/login', (req, res)=>{

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, (err, foundUser)=>{
        if(!err){
            if(foundUser && foundUser.password == password){


                res.send({
                    status: 200
                })

                // jwt.sign({foundUser}, 'secretKey', (err, token) =>{

                //     res.send({ Status: 200, mensaje: "Inicio de sesion exitoso!.", token: token});

                // })

            } else {
                res.send({ Status: 100, mensaje: "Inicio de sesion fallido, revise sus credenciales y vuelva a intentar." });
            }
        } else {
            console.log(error)
            res.send({
                Status: 100,
                mensaje: "Ha ocurrido un error, intentalo de nuevo.",
              });
        }
    })


})


app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
