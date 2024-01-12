const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// creating the express server
const app = express();
const port = process.env.PORT || 5001;

// middleware using cors and allows for JSON use
app.use(cors());
app.use(express.json());

// connect to MongoDB 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;

// test connection 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//require and use these files for CRUD operations
const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

// here whenever someone goes to our root url and then /exercises they will get exerciseRouter and same for /users and usersRouter
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);


// this is what starts the server, starts listening on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


