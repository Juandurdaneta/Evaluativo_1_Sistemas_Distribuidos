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
    }
})


movieSchema.plugin(AutoIncrement, {inc_field: 'movieId'});

exports.getMovie = function() {
    return mongoose.model("Movie", movieSchema)
}