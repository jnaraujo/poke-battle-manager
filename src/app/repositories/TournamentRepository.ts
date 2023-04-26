import { Tournament } from "../entities/tournament/Tournament";
import { Repository } from "./Repository";

export interface TournamentRepository extends Repository<Tournament> {}
