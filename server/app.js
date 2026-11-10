require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");

// Import routes (each controller loads the Firestore connection itself)
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answerRoutes = require("./routes/answerRoute");

const app = express();
const port = process.env.PORT || 3004;

// Only the deployed frontend (and local dev) may call this API from a browser.
// Override with CLIENT_ORIGIN="https://site1.com,https://site2.com".
const allowedOrigins = (
  process.env.CLIENT_ORIGIN ||
  "https://evangadiforump.netlify.app,http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header (curl, server-to-server) are allowed.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "100kb" }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server only when run directly (so tests can import the app)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

module.exports = app;
