import { Pokemon } from "../../entities/pokemon/Pokemon";
import { PokemonRepository } from "../../repositories/PokemonRepository";

interface UpdatePokemonRequest {
  pokemon: Pokemon;
}
export class UpdatePokemonUseCase {
  constructor(private pokemonRepository: PokemonRepository) {}
  async execute({ pokemon }: UpdatePokemonRequest) {
    const doesPokemonExist = await this.pokemonRepository.findById(pokemon.id);

    if (!doesPokemonExist) {
      throw new Error("Pokemon does not exist");
    }

    await this.pokemonRepository.update(pokemon);
  }
}
