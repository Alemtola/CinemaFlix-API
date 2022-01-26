//authenticating the passport strategies
const jwtSecret = "your_jwt_secret";
const jwt = require("jsonwebtoken"),
  passport = require("passport");
require("./passport");

// A function to create a JWT based on the username and password
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // the username encoded in the JWT
    expiresIn: "7d", // specifing the token will expire in 7 days
    algorithm: "HS256" // the algorithm used to “sign” values of the JWT
  });
};

/**
  * POST login.
  * @param {*} router
  * @returns {object} Token, User
  */
// POST login
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
