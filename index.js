import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from "./mongoC.js";

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

// Parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON data
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World, from express in was ec2");
});

// Add a user
app.post("/addUser", async (req, res) => {
  try {
    const collection = db.collection("users");

    const newDocument = {
      ...req.body,
      date: new Date(),
    };

    const result = await collection.insertOne(newDocument);

    res.status(201).json({
      message: "User added successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding user:", error);

    res.status(500).json({
      message: "Failed to add user",
    });
  }
});

// Get all users
app.get("/getUsers", async (req, res) => {
  try {
    const collection = db.collection("users");
    const results = await collection.find({}).toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching users:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
