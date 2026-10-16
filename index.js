import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./mongoC.js";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db;

app.get("/", (req, res) => {
  res.status(200).send("Hello World, from Express on AWS EC2");
});

app.post("/addUser", async (req, res) => {
  try {
    const result = await db.collection("users").insertOne({
      ...req.body,
      date: new Date(),
    });

    res.status(201).json({
      message: "User added successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Failed to add user" });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const results = await db.collection("users").find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

async function startServer() {
  try {
    db = await connectDB();

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is listening at port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exitCode = 1;
  }
}

startServer();
