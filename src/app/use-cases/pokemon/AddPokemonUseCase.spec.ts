import { beforeEach, describe, expect, it } from "vitest";
import { AddPokemonUseCase } from "./AddPokemonUseCase";
import { InMemoryPokemonRepository } from "../../__tests__/repositories/InMemoryPokemonRepository";
import { BattleStats } from "../../value_objects/BattleStats";

describe("AddPokemonUseCase", () => {
  let inMemoryPokemonRepository: InMemoryPokemonRepository;
  let addPokemonUseCase: AddPokemonUseCase;

  beforeEach(() => {
    inMemoryPokemonRepository = new InMemoryPokemonRepository();
    addPokemonUseCase = new AddPokemonUseCase(inMemoryPokemonRepository);
  });

  it("should add a pokemon", async () => {
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

    const pokemons = await inMemoryPokemonRepository.findByTrainerId("123");

    expect(pokemons[0].name).toEqual("Pikachu");
    expect(pokemons[0].id).toBeDefined();
  });

  it("should throw an error if trainer already has 3 pokemons", async () => {
    for (let i = 0; i < 3; i++) {
      await addPokemonUseCase.execute({
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
    }

    await expect(
      addPokemonUseCase.execute({
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
      })
    ).rejects.toThrow("Trainer already has 3 pokemons");
  });
});
