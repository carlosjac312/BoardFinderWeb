import { MongoClient } from 'mongodb';
import { PlayerDB } from "../types.ts";

const url = Deno.env.get('MONGO_URL');
if (!url) {
  throw new Error('MONGO_URL not set');
}

const client = new MongoClient(url);
await client.connect();

const db = client.db('BoardFinderDB');
const PlayersCollection = db.collection<PlayerDB>('users');

export default PlayersCollection;