const express = require("express");
const app = express();
const session = require("express-session");
const facebookRouter = require("./routes/facebookAuth.routes");
const passport = require("passport");
const { connection } = require("./config/db");

require("dotenv").config();

app.set("view engine", "ejs");

//Initializes the express-session middleware.
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

//Initializes the passport middleware.
app.use(passport.initialize());
app.use(passport.session());

//Serialize and deserialize the user data for authentication.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//Renders the authentication page.
app.get("/", (req, res) => {
  res.render("index");
});

//Mounts the Facebook authentication router at the "/auth/facebook" route.
app.use("/index/facebook", facebookRouter);

//Starts the server and connects to the MongoDB database.
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDb..");
  } catch (error) {
    console.log("Trouble connecting to the DB");
    console.log("Error in connecting to mongoDB " + error);
    throw error;
  }
  console.log(`Running at ${process.env.PORT} Port`);
});
