const api = require("express");

// Import modules
const notesRoutes = require("./api_notes.js");

// Initialize express
const app = express();

// Use Routes
app.use("/api/notes", notesRoutes);

// Export module
module.exports = app;
