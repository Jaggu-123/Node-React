const express = require('express');
const mongoose = require('mongoose');

// Files we needed from our project in this file//
const keys = require('./config/keys');
require('./models/Users');                  //models file will be first imported than services file 
require('./services/passport');             //beacuse passport.js is using models/Users in it

mongoose.connect(keys.mongoURI);        

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); 