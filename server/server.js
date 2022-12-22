const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');

mongoose.set('strictQuery', false)

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config
require("./config/mongoose.config");

// routes
require("./routes/user.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));