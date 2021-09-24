//importing express and morgan and assignning to a variable
const express = require("express"),
  morgan = require("morgan");

const app = express();

//the movie data
let movies = [
  {
    title: "Movie 1",
    director: "Direector 1",
    genre: "Genre 1"
  },
  {
    title: "Movie 2",
    director: "Direector 2",
    genre: "Genre 2"
  },
  {
    title: "Movie 3",
    director: "Direector 3",
    genre: "Genre 3"
  },
  {
    title: "Movie 4",
    director: "Direector 4",
    genre: "Genre 4"
  },
  {
    title: "Movie 5",
    director: "Direector 5",
    genre: "Genre 5"
  },
  {
    title: "Movie 6",
    director: "Direector 6",
    genre: "Genre 5"
  },
  {
    title: "Movie 7",
    director: "Direector 7",
    genre: "Genre 4"
  },
  {
    title: "Movie 8",
    director: "Direector 8",
    genre: "Genre 3"
  },
  {
    title: "Movie 9",
    director: "Direector 9",
    genre: "Genre 2"
  },
  {
    title: "Movie 10",
    director: "Direector 10",
    genre: "Genre 1"
  }
];

//Using the Morgan middleware library to log all requests
app.use(morgan("common"));

//a route returning a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to CinemaFlix!");
});

//an express route returning movie data
app.get("/movies", (req, res) => {
  res.json(movies);
});

//exposing files in 'public' folder
app.use(express.static("public"));

//adding error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("CinemaFlix is listening on port 8080.");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
