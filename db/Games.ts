import { MongoClient } from 'mongodb';
import { GameDB } from "../types.ts";

const url = Deno.env.get('MONGO_URL');
if (!url) {
  throw new Error('MONGO_URL not set');
}

const client = new MongoClient(url);
await client.connect();

const db = client.db('BoardFinderDB');
const GamesCollection = db.collection<GameDB>('games');

export default GamesCollection;