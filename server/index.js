const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express();

// we are making a new instance for authentication with google
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
    })
);


//creating a route handler for pushing the user for auth process whenever he direct to /auth/google //
app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']             //we are demanding for user profile and email
    })
);

//creating a route handler to pushback the route with incoming code from above route for accessing user profile//
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT); 