const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Files we needed from our project in this file//
const keys = require('./config/keys');
require('./models/Users');                  //models file will be first imported than services file 
require('./services/passport');             //beacuse passport.js is using models/Users in it

mongoose.connect(keys.mongoURI);        

const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); 