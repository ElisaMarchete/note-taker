const express = require("express");
const path = require("path");
// const fs = require("fs");

// Initialize an instance of Express.js
const app = express();

// Import routes
const routes = require("./routes/index_Routes.js");

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.urlencoded({ extended: true }));
// return the data in json format
app.use(express.json());

// return in html format
app.use(express.static("public"));

// Use Routes
app.use("/api", routes);

// GET REQUESTS
// Create Express.js routes for default '/', '/Notes, and '/api/notes'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
