const express = require("express");

// Import modules
const notesRoutes = require("./api_notes");

// Initialize express
const app = express();

// Use Routes
app.use("/notes", notesRoutes);

// Export module
module.exports = app;
