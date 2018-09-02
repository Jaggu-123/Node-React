const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

// we are making a new instance for authentication with google
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(existingUser => {
            if(existingUser){
                //if have a User record previously saved in our database
                done(null, existingUser);           //done(error, User)
            } else{
                //we don't have user record previously saved
                new User({ googleId: profile.id }).save()
                    .then(user => done(null, user));
            }
        })
        
    })
);




//We will not export anything from this file as we only need this code to be executed//