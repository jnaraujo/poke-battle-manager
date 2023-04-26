import { beforeEach, describe, expect, it } from "vitest";
import { League } from "./League";
import { Trainer } from "../trainer/Trainer";
import { Battle } from "../battle/Battle";

describe("League", () => {
  let league: League;
  let trainer1: Trainer;
  let trainer2: Trainer;
  let battle: Battle;

  beforeEach(() => {
    trainer1 = new Trainer({
      id: "1",
      name: "Ash",
      city: "Pallet Town",
      age: 18,
      level: 1,
      pokemons: [],
      items: [],
      league: "Kanto",
    });

    trainer2 = new Trainer({
      id: "2",
      name: "Misty",
      city: "Cerulean City",
      age: 20,
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

    league = new League({
      id: "1",
      battles: [battle],
      trainers: [trainer1, trainer2],
      registrationFee: 100,
      prize: 1000,
    });
  });

  it("should start a league", () => {
    expect(league.startedAt).toBeNull();

    league.start();
    expect(league.startedAt).not.toBeNull();
  });

  it("should finish a league", () => {
    expect(league.finishedAt).toBeNull();

    league.finish();
    expect(league.finishedAt).not.toBeNull();
  });

  it("should check if a league is finished", () => {
    expect(league.isFinished()).toBeFalsy();

    league.finish();
    expect(league.isFinished()).toBeTruthy();
  });

  it("should be equal to another league", () => {
    const anotherLeague = new League({
      id: "1",
      battles: [battle],
      trainers: [trainer1, trainer2],
      registrationFee: 100,
      prize: 1000,
    });

    expect(league.equals(anotherLeague)).toBeTruthy();
  });

  it("should not be equal to another league", () => {
    const anotherLeague = new League({
      id: "2",
      battles: [battle],
      trainers: [trainer1, trainer2],
      registrationFee: 100,
      prize: 1000,
    });

    expect(league.equals(anotherLeague)).toBeFalsy();
  });
});
