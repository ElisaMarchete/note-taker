// Import Express.js
const express = require("express");
const db = require("./db/db.json");
const path = require("path");
// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3002;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Create Express.js routes for default '/', '/Notes'
app.get("/", (req, res) => {
  //console.log(__dirname);
  //console.log(path.join(__dirname, "public/first.html"));
  res.sendFile(path.join(__dirname, "public/index.html"));
  // Show the user agent information in the terminal
  // console.info(req.rawHeaders);

  // Log our request to the terminal
  // console.info(`${req.method} request received`);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
  // Show the user agent information in the terminal
  // console.info(req.rawHeaders);

  // Log our request to the terminal
  // console.info(`${req.method} request received`);
});

// path to access notes saved by user
app.get("/api/notes", (req, res) => {
  res.json(db); // Maybe need to change path /api
});

// POST request
app.post("/api/notes", (req, res) => {
  // Let the client know that their POST request was received
  res.json(`${req.method} request received`);

  // Show the user agent information in the terminal
  // console.info(req.rawHeaders);

  // Log our request to the terminal
  // console.info(`${req.method} request received`);
});

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
