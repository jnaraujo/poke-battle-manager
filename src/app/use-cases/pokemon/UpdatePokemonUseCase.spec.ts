import { beforeEach, describe, expect, it } from "vitest";
import { UpdatePokemonUseCase } from "./UpdatePokemonUseCase";
import { InMemoryPokemonRepository } from "../../__tests__/repositories/InMemoryPokemonRepository";
import { BattleStats } from "../../value_objects/BattleStats";
import { AddPokemonUseCase } from "./AddPokemonUseCase";
import { Pokemon } from "../../entities/pokemon/Pokemon";

describe("UpdatePokemonUseCase", () => {
  let inMemoryPokemonRepository: InMemoryPokemonRepository;
  let updatePokemonUseCase: UpdatePokemonUseCase;
  let addPokemonUseCase: AddPokemonUseCase;

  beforeEach(() => {
    inMemoryPokemonRepository = new InMemoryPokemonRepository();
    updatePokemonUseCase = new UpdatePokemonUseCase(inMemoryPokemonRepository);
    addPokemonUseCase = new AddPokemonUseCase(inMemoryPokemonRepository);
  });

  it("should update a pokemon", async () => {
    const pikachu = await addPokemonUseCase.execute({
      name: "Pikachu",
      level: 25,
      life: 100,
      type: ["electric"],
      stats: new BattleStats({
        attack: 10,
        defense: 10,
        speed: 10,
      }),
      moves: [],
      trainerID: "123",
    });

    expect(
      (await inMemoryPokemonRepository.findById(pikachu.id))?.level
    ).toEqual(25);

    pikachu.level = 26;

    await updatePokemonUseCase.execute({
      pokemon: pikachu,
    });

    expect(
      (await inMemoryPokemonRepository.findById(pikachu.id))?.level
    ).toEqual(26);
  });

  it("should throw an error if pokemon does not exist", async () => {
    const pikachu = new Pokemon({
      id: "123",
      level: 25,
      life: 100,
      moves: [],
      name: "Pikachu",
      stats: new BattleStats({
        attack: 10,
        defense: 10,
        speed: 10,
      }),
      trainerID: "123",
      type: ["electric"],
    });

    await expect(
      updatePokemonUseCase.execute({
        pokemon: pikachu,
      })
    ).rejects.toThrow("Pokemon does not exist");
  });
});
