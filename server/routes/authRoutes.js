const passport = require('passport');

module.exports = (app) => {
    //creating a route handler for pushing the user for auth process whenever he direct to /auth/google //
    app.get('/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']             //we are demanding for user profile and email
        })
    );

    //creating a route handler to pushback the route with incoming code from above route for accessing user profile//
    app.get('/auth/google/callback', passport.authenticate('google'));
}

// we will export as this code as app = express is defined in index.js//