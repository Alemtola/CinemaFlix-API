//importing mongoose
const mongoose = require("mongoose");

//creating the movie schema
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  ReleaseYear: Number,
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    BirthYear: Number
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

//creating the user schema
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
});

//creating the movie model
let Movie = mongoose.model("Movie", movieSchema);
//creating the user model
let User = mongoose.model("User", userSchema);

//exporting the models
module.exports.Movie = Movie;
module.exports.User = User;
