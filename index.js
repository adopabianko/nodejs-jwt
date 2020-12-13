const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

//Database connection
mongoose.connect(
    process.env.DB_CONNECT, 
    {useNewUrlParser: true, useUnifiedTopology: true}
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to db');
});

app.use(express.json());

app.use('/api/user/', authRoute);
app.use('/post', postRoute);

app.listen(3000, () => console.log('Server up and running'));