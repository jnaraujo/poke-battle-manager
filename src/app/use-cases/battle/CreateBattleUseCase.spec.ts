import { beforeEach, describe, expect, it } from "vitest";
import { CreateBattleUseCase } from "./CreateBattleUseCase";
import { InMemoryBattleRepository } from "../../__tests__/repositories/InMemoryBattleRepository";
import { InMemoryTrainerRepository } from "../../__tests__/repositories/InMemoryTrainerRepository";
import { InMemoryPokemonRepository } from "../../__tests__/repositories/InMemoryPokemonRepository";
import { CreateTrainerUseCase } from "../trainer/CreateTrainerUseCase";
import { AddPokemonUseCase } from "../pokemon/AddPokemonUseCase";
import { BattleStats } from "../../value_objects/BattleStats";
import { Trainer } from "../../entities/trainer/Trainer";
import { League } from "../../entities/league/League";

describe("CreateBattleUseCase", () => {
  let createBattleUseCase: CreateBattleUseCase;
  let createTrainerUseCase: CreateTrainerUseCase;
  let addPokemonUseCase: AddPokemonUseCase;
  let inMemoryBattleRepository: InMemoryBattleRepository;
  let inMemoryTrainerRepository: InMemoryTrainerRepository;
  let inMemoryPokemonRepository: InMemoryPokemonRepository;
  let trainer1: Trainer;
  let trainer2: Trainer;

  beforeEach(async () => {
    inMemoryBattleRepository = new InMemoryBattleRepository();
    inMemoryTrainerRepository = new InMemoryTrainerRepository();
    inMemoryPokemonRepository = new InMemoryPokemonRepository();

    createBattleUseCase = new CreateBattleUseCase(inMemoryBattleRepository);
    createTrainerUseCase = new CreateTrainerUseCase(inMemoryTrainerRepository);

    addPokemonUseCase = new AddPokemonUseCase(inMemoryPokemonRepository);

    trainer1 = await createTrainerUseCase.execute({
      name: "Ash",
      city: "Pallet",
      age: 10,
      level: 1,
      pokemons: [],
      items: [],
      league: new League({
        id: "123",
        name: "Kanto",
        prize: 1000,
        registrationFee: 100,
      }),
    });

    for (let i = 0; i < 3; i++) {
      const pokemon = await addPokemonUseCase.execute({
        name: `Pikachu ${i}`,
        type: ["Electric"],
        level: 1,
        trainerID: trainer1.id,
        life: 100,
        moves: [],
        stats: new BattleStats({
          attack: 100,
          defense: 100,
          speed: 100,
        }),
      });

      trainer1.pokemons.push(pokemon);
    }

    trainer2 = await createTrainerUseCase.execute({
      name: "Misty",
      city: "Cerulean",
      age: 10,
      level: 1,
      pokemons: [],
      items: [],
      league: new League({
        id: "123",
        name: "Kanto",
        prize: 1000,
        registrationFee: 100,
      }),
    });

    for (let i = 0; i < 3; i++) {
      const pokemon = await addPokemonUseCase.execute({
        name: `Pikachu ${i}`,
        type: ["Electric"],
        level: 1,
        trainerID: trainer2.id,
        life: 100,
        moves: [],
        stats: new BattleStats({
          attack: 100,
          defense: 100,
          speed: 100,
        }),
      });

      trainer2.pokemons.push(pokemon);
    }
  });
  it("should create a battle", async () => {
    const battle = await createBattleUseCase.execute({
      trainer1,
      trainer2,
    });

    expect(battle).toBeDefined();
    expect(battle.id).toBeDefined();
    expect(battle.trainer1).toStrictEqual(trainer1);
    expect(battle.trainer2).toStrictEqual(trainer2);
  });

  it("should not create a battle if trainers have less than 3 pokemons", async () => {
    trainer1.pokemons = trainer1.pokemons.slice(0, 2);
    trainer2.pokemons = trainer2.pokemons.slice(0, 2);

    await expect(
      createBattleUseCase.execute({
        trainer1,
        trainer2,
      })
    ).rejects.toThrowError("Trainers must have at least 3 pokemons to battle");
  });

  it("should not create a battle if trainers are from different leagues", async () => {
    trainer2.league = new League({
      id: "456",
      name: "League 2",
      prize: 100,
      registrationFee: 10,
    });

    await expect(
      createBattleUseCase.execute({
        trainer1,
        trainer2,
      })
    ).rejects.toThrowError("Trainers must be from the same league to battle");
  });

  it("should not create a battle if trainers are the same", async () => {
    await expect(
      createBattleUseCase.execute({
        trainer1,
        trainer2: trainer1,
      })
    ).rejects.toThrowError("Trainers must be different to battle");
  });
});
