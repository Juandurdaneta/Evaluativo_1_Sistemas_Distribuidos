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
    


    const newMovie = new Movie(
        req.body
    
    )

    newMovie.save((err) =>{
        if(err){
            console.log('Error al crear la pelicula')
            console.log(err)
            res.send({
                status: 100,
                mensaje: "Hubo un error al agregar la pelicula a la base de datos, intentalo de nuevo.",
              });
        } else{
            console.log('Pelicula agregada exitosamente')
            res.send({ Status: 200, mensaje: "Pelicula agregada a la base de datos Exitosamente!." });
        }
    })

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

// obtener una pelicula en especifico
app.get('/movies/:movieId', (req, res)=>{
    const movieId = req.params.movieId

    Movie.find({movieId: movieId}, (err, movieFound)=>{
        if(!err && movieFound[0]){
            res.send({ 
                status: 200, 
                peliculaEncontrada: movieFound[0]
            });
        } else if(!movieFound[0]){
            res.send({
                status: 100,
                mensaje: `No se ha encontrado pelicula con el id ${movieId}`
            })
        } else if(err){
            res.send(err)
        }
    })
})

// actualizar una pelicula 
app.put('/movies/:movieId', (req,res)=>{
  
    Movie.findOneAndUpdate({movieId: req.params.movieId}, req.body, (err, movieFound)=>{
        if(!err && movieFound){
            res.send({ 
                status: 200, 
                mensaje: 'Pelicula actualizada exitosamente!'
            }); 
        } else{
            res.send({
                status: 100,
                mensaje: 'Se ha producido un error. Vuelve a intentarlo.'
            })
        }
    })

})

// eliminar una pelicula
app.delete('/movies/:movieId', (req,res)=>{
    try{
        Movie.findOneAndDelete({movieId: req.params.movieId}, (err, movieDeleted)=>{
            if(!err){
                res.send({ 
                    status: 200, 
                    mensaje: 'Pelicula eliminada exitosamente'
                });
            } else {
                res.send({ 
                    status: 100, 
                    mensaje: "Se ha producido un error, vuelva a intentarlo."
                });
            }
        });
       
    } catch(err){
        res.send(err);
    }
});



app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
