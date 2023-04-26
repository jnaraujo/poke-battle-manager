import { Pokemon } from "../../entities/pokemon/Pokemon";
import { PokemonRepository } from "../../repositories/PokemonRepository";

export class InMemoryPokemonRepository implements PokemonRepository {
  private pokemons: Pokemon[] = [];

  async findByTrainerId(trainerId: string): Promise<Pokemon[]> {
    return this.pokemons.filter((pokemon) => pokemon.trainerID === trainerId);
  }
  async findAll(): Promise<Pokemon[]> {
    return this.pokemons;
  }
  async findById(id: string): Promise<Pokemon | null> {
    return this.pokemons.find((pokemon) => pokemon.id === id) || null;
  }
  async save(entity: Pokemon): Promise<void> {
    this.pokemons.push(entity);
  }
  async delete(entity: Pokemon): Promise<void> {
    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== entity.id);
  }
  async update(entity: Pokemon): Promise<void> {
    const index = this.pokemons.findIndex(
      (pokemon) => pokemon.id === entity.id
    );
    this.pokemons[index] = entity;
  }
}
