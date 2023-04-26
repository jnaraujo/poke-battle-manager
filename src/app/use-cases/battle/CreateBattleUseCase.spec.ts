import crypto from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateBattleUseCase } from "./CreateBattleUseCase";
import { InMemoryBattleRepository } from "../../__tests__/repositories/InMemoryBattleRepository";
import { InMemoryTrainerRepository } from "../../__tests__/repositories/InMemoryTrainerRepository";
import { InMemoryPokemonRepository } from "../../__tests__/repositories/InMemoryPokemonRepository";
import { BattleStats } from "../../value_objects/BattleStats";
import { Trainer } from "../../entities/trainer/Trainer";
import { League } from "../../entities/league/League";
import { Pokemon } from "../../entities/pokemon/Pokemon";

describe("CreateBattleUseCase", () => {
  let createBattleUseCase: CreateBattleUseCase;
  let inMemoryBattleRepository: InMemoryBattleRepository;
  let trainer1: Trainer;
  let trainer2: Trainer;

  beforeEach(async () => {
    inMemoryBattleRepository = new InMemoryBattleRepository();

    createBattleUseCase = new CreateBattleUseCase(inMemoryBattleRepository);
    trainer1 = new Trainer({
      id: crypto.randomUUID(),
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
      trainer1.pokemons.push(
        new Pokemon({
          id: crypto.randomUUID(),
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
        })
      );
    }

    trainer2 = new Trainer({
      id: crypto.randomUUID(),
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
      trainer2.pokemons.push(
        new Pokemon({
          id: crypto.randomUUID(),
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
        })
      );
    }
  });

  it("should create a battle", async () => {
    const battle = await createBattleUseCase.execute({
      trainer1,
      trainer2,
      league: new League({
        id: "123",
        name: "Kanto",
        prize: 1000,
        registrationFee: 100,
      }),
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
        league: new League({
          id: "123",
          name: "Kanto",
          prize: 1000,
          registrationFee: 100,
        }),
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
        league: new League({
          id: "123",
          name: "Kanto",
          prize: 1000,
          registrationFee: 100,
        }),
      })
    ).rejects.toThrowError("Trainers must be from the same league to battle");
  });

  it("should not create a battle if trainers are the same", async () => {
    await expect(
      createBattleUseCase.execute({
        trainer1,
        trainer2: trainer1,
        league: new League({
          id: "123",
          name: "Kanto",
          prize: 1000,
          registrationFee: 100,
        }),
      })
    ).rejects.toThrowError("Trainers must be different to battle");
  });
});
