//importing mongoose
const mongoose = require("mongoose");
//importing bcrypt for password hashing and encryption
const bcrypt = require("bcrypt");

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
//applies hasing to the passwords
userSchema.statics.hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};
//compares submitted hashed passwords with hashed passwords stored in database.
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

//creating the genre schema
let genreSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String, required: true }
});

//creating the director schema
let directorSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Bio: { type: String, required: true },
  BirthYear: Number
});

//creating the movie model
let Movie = mongoose.model("Movie", movieSchema);
//creating the user model
let User = mongoose.model("User", userSchema);
//creating the movie model
let Genre = mongoose.model("Genre", genreSchema);
//creating the user model
let Director = mongoose.model("Director", directorSchema);

//exporting the models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
