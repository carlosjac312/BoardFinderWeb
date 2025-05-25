import { OptionalId, ObjectId } from "mongodb";

export type Player = {
  id: string;
  name: string;
  password: string;
  games_id: ObjectId[];
}

export type PlayerDB = OptionalId<Omit<Player,"id">>;