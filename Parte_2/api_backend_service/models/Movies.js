const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
      },
    genre: {
        type: String
    },
    poster_url : {
        type: String
    },
    movieId : {
        type: Number,
        required: true
    }
})


movieSchema.plugin(AutoIncrement, {inc_field: 'id'});

exports.getMovie = function() {
    return mongoose.model("Movie", movieSchema)
}