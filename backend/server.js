const posts = require('./apis/posts')
const users = require('./apis/users')
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');

const localMongoEndpoint = 'mongodb://127.0.0.1/project3';
const mongoEndpoint = process.env.MONGODB_URI || localMongoEndpoint;

mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(process.env.PORT || 8000, function() {
    console.log("Starting server now...")
})

app.use('/api/posts/', posts);
app.use('/api/users/', users);