import { ObjectId, OptionalId } from "mongodb";

export type Player = {
  id: string;
  username: string;
  password: string;
  games_id: ObjectId[];
};

export type Game = {
  id: string;
  gamename: string;
  gameinfo: {
    location: string;
    date: string;
    description: string;
  };
  owner: string;
  max_players: number;
  players: string[];
  full: boolean;
};

export type PlayerDB = OptionalId<Omit<Player, "id">>;
export type GameDB = OptionalId<Omit<Game, "id">>;
