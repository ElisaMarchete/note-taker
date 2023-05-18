const express = require("express");
const fs = require("fs");
const path = require("path");
// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.urlencoded({ extended: true }));
// return the data in json format
app.use(express.json());

// return in html format
app.use(express.static("public"));

// GET REQUESTS
// Create Express.js routes for default '/', '/Notes, and '/api/notes'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));

  // console.info(`${req.method} request received`);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));

  // console.info(`${req.method} request received`);
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    // console.log({ data });
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new review

      return res.json(parsedNotes);
    }
  });
});

// POST REQUESTS
app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  // assignment for the items in req.body ->  body = payload
  // line below same as: const title = req.body.title; const text = req.body.text;
  const { title, text } = req.body;

  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };

    // Obtain existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 2),
          (writeErr) => {
            if (writeErr) {
              console.error(writeErr);
            } else {
              console.info("Successfully updated notes!");

              const response = {
                status: "success",
                body: newNote,
              };

              console.log(response);
              return res.status(201).json(response);
            }
          }
        );
      }
    });

    // The browser needs to receive a confirmation, because if not the browser will wait and will hung up
  } else {
    res.status(500).json("Error in posting note");
  }
});

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
