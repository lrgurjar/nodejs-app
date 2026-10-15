import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const connectionString = `mongodb+srv://leelaramg334_db_user:bIk3xYF35sMjrJzp@devcluster.dkho0rl.mongodb.net/`; // cluster url
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("connection successful");
} catch (e) {
  console.error(e);
}
let db = conn.db("integration_ninjas");
export default db;
