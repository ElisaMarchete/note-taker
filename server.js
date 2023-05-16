// Import Express.js
const express = require("express");
const db = require("./db/db.json");
// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Create Express.js routes for default '/', '/Notes'
app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

app.get("/notes", (req, res) => {
  res.sendFile("./public/notes.html");
});

// path to access notes saved by user
app.get("/api/notes", (req, res) => res.json(db)); // Maybe need to change path /api

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
