import express from "express";
import cors from "cors";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // No trailing slash!
    credentials: true,
  })
);

let LatestPost = null

// API Route
app.post("/api/posts", async (req, res) => {
  LatestPost = (req.body); // should now work
  console.log(req.body)
  res.status(200).json({ message: "Received" });
});

app.get("/api/info", async (req, res) => {
  console.log(LatestPost)
  res.status(200).json(LatestPost)
});


// Start server
app.listen(3000, () => {
  console.log("Server is Listening on Port 3000");
});
