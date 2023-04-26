import { Pokemon } from "../../entities/pokemon/Pokemon";
import { PokemonRepository } from "../../repositories/PokemonRepository";
import crypto from "node:crypto";
import { BattleStats } from "../../value_objects/BattleStats";
import { PokemonMove } from "../../value_objects/PokemonMove";

interface AddPokemonRequest {
  trainerID: string;
  name: string;
  level: number;
  life: number;
  type: string[];
  stats: BattleStats;
  moves: PokemonMove[];
}

export class AddPokemonUseCase {
  constructor(private pokemonRepository: PokemonRepository) {}

  async execute({
    trainerID,
    name,
    level,
    life,
    type,
    stats,
    moves,
  }: AddPokemonRequest): Promise<void> {
    const pokemon = new Pokemon({
      id: crypto.randomUUID(),
      trainerID: trainerID,
      name: name,
      level: level,
      life: life,
      type: type,
      stats: stats,
      moves: moves,
    });

    const trainerPokemons = await this.pokemonRepository.findByTrainerId(
      pokemon.trainerID
    );

    if (trainerPokemons.length >= 3) {
      throw new Error("Trainer already has 3 pokemons");
    }

    await this.pokemonRepository.save(pokemon);
  }
}
