const express = require('express');
const connectDatabase = require("./db");
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
require('dotenv').config({
    path: path.resolve('config.env'),
});

const app = express();

app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//COnnecting to the database
connectDatabase();

//Importing routes
const user = require("./routes/userRoutes");

app.use("/", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}/`);
})
