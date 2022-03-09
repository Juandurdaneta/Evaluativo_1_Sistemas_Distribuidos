const express = require('express');
const mongoose = require("mongoose");
const movieSchema = require(__dirname + "/models/Movies.js");
const port = 4200
const app = express();

// bd
mongoose.connect("mongodb://localhost:27017/movies", { useUnifiedTopology: true, useNewUrlParser: true });
const Movie = movieSchema.getMovie();

// config del body-parser
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// agregar una nueva pelicula
app.post('/movies', (req,res)=>{
    
    const movieCount =  Movie.find({},(err, moviesFound) => {
        movieCount = moviesFound.length + 1
    }) 

    console.log(movieCount)

    // const newMovie = new Movie({
    //     movieId: movieCount,
    //     ...req.body
    // }
    // )

    // newMovie.save((err) =>{
    //     if(err){
    //         console.log('Error al crear la pelicula')
    //         console.log(err)
    //         res.send({
    //             status: 100,
    //             mensaje: "Hubo un error al agregar la pelicula a la base de datos, intentalo de nuevo.",
    //           });
    //     } else{
    //         console.log('Pelicula agregada exitosamente')
    //         res.send({ Status: 200, mensaje: "Pelicula agregada a la base de datos Exitosamente!." });
    //     }
    // })

})


// obtener peliculas de la base de datos
app.get('/movies', (req,res)=>{
    Movie.find({}, (err, moviesFound) =>{ 
        if(!err){
            res.send({ 
                status: 200, 
                peliculasEncontradas: moviesFound
            });
        } else {
            res.send({
                status: 100,
                mensaje: "Se ha producido un error, vuelva a intentarlo."
            })
        }
        
     })
})

// actualizar una pelicula 
app.put('/movies', (req,res)=>{
    
})

// eliminar una pelicula
app.delete('/movies', (req,res)=>{
    
})



app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
