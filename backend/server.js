import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

export const { Pool } = pkg;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5001;

const connectionString = process.env.DB_CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to PostgreSQL database!");
    done();
  }
});

app.get("/", (req, res) => {
  res.send("Hello, this is your backend server!");
});

app.get("/api/search", async (req, res) => {
  const { name } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM my_cat_twin WHERE name = $1",
      [name]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing search query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add endpoint
app.post("/api/add", async (req, res) => {
  const { name, cat } = req.body;

  try {
    await pool.query(
      "INSERT INTO my_cat_twin (name, cat, searchcount) VALUES ($1, $2, $3)",
      [name, cat, 1]
    );
    res.json({ message: "Name added successfully" });
  } catch (error) {
    console.error("Error adding name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Increment endpoint
app.put("/api/increment", async (req, res) => {
  const { name } = req.query;

  try {
    await pool.query(
      "UPDATE my_cat_twin SET searchcount = searchcount + 1 WHERE name = $1",
      [name]
    );
    res.json({ message: "Times searched incremented successfully" });
  } catch (error) {
    console.error("Error incrementing times searched:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Close the database connection when the server is stopped

process.on("SIGINT", () => {
  pool
    .end()
    .then(() => {
      console.log("Database connection closed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error closing database connection:", error);
      process.exit(1);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
