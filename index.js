//importing the modules and assignning to a variable
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

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

//the user data
let users = [
  {
    id: "txsddf0222-xr2t-0000",
    name: "Brad Tomson",
    birthdate: "01.10.1990",
    username: "bratom1",
    email: "tomsonb@mail.com",
    password: "son1990"
  }
];

//Using the Morgan middleware library to log all requests
app.use(morgan("common"));

//a route returning a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to CinemaFlix!");
});

//Returns a data about list of all movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

//Returns a data about a single movie by title
app.get("/movies/:title", (req, res) => {
  res.json(
    movies.find(movie => {
      return movie.title === req.params.title;
    })
  );
});

//Returns a list of all movie genres
app.get("/genres", (req, res) => {
  res.send("Successful GET request returning data on all movie genres");
});

//Returns data about a single genre by name
app.get("/genres/:name", (req, res) => {
  res.send("Successful GET request returning data on a single genre by name");
});

//Returns a list of all movie directors
app.get("/directors", (req, res) => {
  res.send("Successful GET request returning data on all movie directors");
});

//Returns the data of a single movie director by name
app.get("/directors/:name", (req, res) => {
  res.send(
    "Successful GET request returning data on a single movie director by name"
  );
});

//Returns the list of all users
app.get("/users", (req, res) => {
  res.json(users);
});

//Adds a new user to the list of users
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//Update the user info  by name
app.put("/users/:name/:username", (req, res) => {
  let user = users.find(user => {
    return user.name === req.params.name;
  });

  if (user) {
    user.username = req.params.username;
    res
      .status(201)
      .send(
        "User " +
          req.params.name +
          " has changed the username into " +
          req.params.username
      );
  } else {
    res
      .status(404)
      .send("User with the name " + req.params.name + " was not found.");
  }
});

//Allow users to add a movie to their favorite list
app.post("/users/:username/favorites/:movieId", (req, res) => {
  res.send("Successful POST request adding a movie to favorite list");
});

//Allow users to delete a movie from their favorite list
app.delete("/users/:username/favorites/:movieId", (req, res) => {
  res.send("Successful DELETE request removing a movie from favorite list");
});

//Allowing existing users to de-register
app.delete("/users/:username", (req, res) => {
  res.send("Successful DELETE request deleting selected user data");
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
