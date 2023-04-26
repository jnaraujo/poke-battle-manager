import { beforeEach, describe, it, expect } from "vitest";
import { Trainer } from "./Trainer";
import { Item } from "../item/Item";
import { BattleStats } from "../../value_objects/BattleStats";
import { Pokemon } from "../pokemon/Pokemon";

describe("Trainer", () => {
  let trainer: Trainer;

  beforeEach(() => {
    trainer = new Trainer({
      id: "1",
      name: "Ash",
      city: "Pallet Town",
      age: 10,
      level: 1,
      pokemons: [
        new Pokemon({
          id: "1",
          name: "Pikachu",
          stats: new BattleStats({
            attack: 100,
            defense: 100,
            speed: 100,
          }),
          level: 25,
          life: 100,
          moves: [],
          trainerID: "1",
          type: ["Electric"],
        }),
      ],
      items: [
        new Item({
          id: "1",
          name: "Potion",
          increaseLife: 20,
          increaseAttack: 0,
          increaseDefense: 0,
          increaseSpeed: 0,
        }),
      ],
      league: "Kanto",
    });
  });

  it("should create a trainer", () => {
    expect(trainer).toBeDefined();
  });

  it("should apply item", () => {
    const pikachu = trainer.pokemons[0];
    const potion = trainer.items[0];

    trainer.applyItem(potion, pikachu);

    expect(pikachu.life).toBe(120);
  });
});
