const notes = require("express").Router();
const fs = require("fs");
const path = require("path");

const uuid = require("../helpers/uuid");

// GET REQUESTS
notes.get("/", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
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
notes.post("/", (req, res) => {
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
      id: uuid(),
    };

    // Obtain existing notes
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          path.join(__dirname, "../db/db.json"),
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

notes.delete("/:id", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to delete a note`);

  // Destructuring assignment for the items in req.params
  // Only thing we need is the ID -> the line below is the same as: const id = req.params.id;
  const { id } = req.params;
  console.log(req.params);

  // Obtain existing notes
  fs.readFile(
    path.join(__dirname, "../db/db.json"),
    "utf8",
    (readErr, data) => {
      if (readErr) {
        console.error(readErr);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Filter returns an array of all notes that does not match the ID -> Remove the matching note
        const updatedNotes = parsedNotes.filter((note) => note.id !== id);

        // Write the updated notes back to the file
        fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          JSON.stringify(updatedNotes, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
        // The browser needs to receive a confirmation, because if not the browser will wait and will hung up
        res.json(`Note ${id} has been deleted`);
      }
    }
  );
});

module.exports = notes;
