import { Pokemon } from "../entities/pokemon/Pokemon";
import { Repository } from "./Repository";

export interface PokemonRepository extends Repository<Pokemon> {
  findByTrainerId(trainerId: string): Promise<Pokemon[]>;
}
