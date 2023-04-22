const UserModel = require("../models/User.model");
const express = require("express");
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const facebookRouter = express.Router();

require("dotenv").config();

//The Passport-Facebook strategy used for authentication.
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await UserModel.findOne({
        accountId: profile.id,
        provider: "facebook",
      });
      if (!user) {
        console.log("Adding new facebook user to DB..");
        const user = new UserModel({
          accountId: profile.id,
          name: profile.displayName,
          provider: profile.provider,
        });
        await user.save();
        return cb(null, profile);
      } else {
        console.log("Facebook User already exist in DB..");
        return cb(null, profile);
      }
    }
  )
);

// GET route that redirects the user to Facebook's authentication page.
facebookRouter.get("/", passport.authenticate("facebook", { scope: "email" }));

//GET route that handles Facebook's callback after authentication.
facebookRouter.get(
  "/callback",
  passport.authenticate("facebook", {
    //If authentication fails, it redirects to an error page.
    failureRedirect: "/index/facebook/error",
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect("/index/facebook/success");
  }
);

//GET route that displays a success page after Facebook authentication.
facebookRouter.get("/success", async (req, res) => {
  const userInfo = {
    id: req.session.passport.user.id,
    displayName: req.session.passport.user.displayName,
    provider: req.session.passport.user.provider,
  };
  res.render("fb-success", { user: userInfo });
});

//GET route that displays an error page if Facebook authentication fails.
facebookRouter.get("/error", (req, res) =>
  res.send("Error logging in via Facebook..")
);

//GET route that sign-out the user.
facebookRouter.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.render("index");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out fb user" });
  }
});

module.exports = facebookRouter;
