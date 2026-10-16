import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const password = encodeURIComponent((process.env.MONGO_PASSWORD || "").trim());

if (!password) {
  throw new Error("MONGO_PASSWORD is missing in the .env file");
}

const connectionString = `mongodb+srv://leelaramg334_db_user:${password}@devcluster.dkho0rl.mongodb.net/`;

const client = new MongoClient(connectionString);

await client.connect();

console.log("MongoDB connection successful");

const db = client.db("integration_ninjas");

export default db;
