//  Require Express to run server
const express = require("express");

// Start up an instance of app
const app = express();

// Cors 
const cors = require("cors");
app.use(cors());

// body-parser 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Initialize the main project folder 
app.use(express.static("website"));

// Callback function to complete GET  '/all'
const getAll = (req, res) => res.status(300).send(projectData);

// GET Route
app.get("/all", getAll);

// Callback function to complete POST  '/add'
const postData = (req, res) => {
    projectData = req.body;
     console.log(projectData);
     res.status(300).send(projectData);
}

// POST Route 
app.post("/add", postData);

// port number & hostname
const post = 5000;
const hostname = '127.0.0.1';

// Function to tast the server 
const listening = () => console.log(`Server running at http://${hostname}:${post}/`);

// Spin up the server 
app.listen(post, listening);



