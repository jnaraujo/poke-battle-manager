import { beforeEach, describe, expect, it } from "vitest";
import { Battle } from "./Battle";
import { Trainer } from "../trainer/Trainer";

describe("Battle", () => {
  let battle: Battle;
  let trainer1: Trainer;
  let trainer2: Trainer;

  beforeEach(() => {
    trainer1 = new Trainer({
      id: "1",
      name: "Ash",
      city: "Pallet",
      age: 10,
      level: 1,
      pokemons: [],
      items: [],
      league: "Kanto",
    });

    trainer2 = new Trainer({
      id: "2",
      name: "Misty",
      city: "Cerulean",
      age: 10,
      level: 1,
      pokemons: [],
      items: [],
      league: "Kanto",
    });

    battle = new Battle({
      id: "1",
      trainer1,
      trainer2,
    });
  });

  it("should start a battle", () => {
    expect(battle.startedAt).toBeNull();

    battle.start();
    expect(battle.startedAt).not.toBeNull();
  });

  it("should finish a battle", () => {
    expect(battle.finishedAt).toBeNull();
    expect(battle.winner).toBeNull();
    expect(battle.loser).toBeNull();

    battle.finish(trainer1, trainer2);
    expect(battle.finishedAt).not.toBeNull();
    expect(battle.winner).toEqual(trainer1);
    expect(battle.loser).toEqual(trainer2);
  });

  it("should check if a battle is finished", () => {
    expect(battle.isFinished()).toBe(false);

    battle.finish(trainer1, trainer2);
    expect(battle.isFinished()).toBe(true);
  });

  it("should check if a battle is equal to another battle", () => {
    const battle2 = new Battle({
      id: "2",
      trainer1,
      trainer2,
    });

    expect(battle.equals(battle2)).toBe(false);

    battle2.id = "1";
    expect(battle.equals(battle2)).toBe(true);
  });
});
