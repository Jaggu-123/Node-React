const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

//we  are making the function to encrypt the profile.id 
passport.serializeUser((user, done) => {
    done(null, user.id);                    //here user.id is the unique id which mongoDB give to each record we save
});

// we are making the function to decrypt the user.id
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
})

// we are making a new instance for authentication with google
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
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