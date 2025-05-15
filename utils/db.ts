import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
export const client = new MongoClient(uri);
export let db: any;

export async function connectToDatabase() {
  await client.connect();
  db = client.db("node_assignment");
  console.log("Connected to MongoDB");
}
