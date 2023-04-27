import { beforeEach, describe, expect, it } from "vitest";
import { League } from "../league/League";
import { Trainer } from "../trainer/Trainer";
import { Battle } from "../battle/Battle";
import { Tournament } from "./Tournament";

describe("Tournament", () => {
  let tournament: Tournament;
  let league: League;
  let trainer1: Trainer;
  let trainer2: Trainer;

  beforeEach(() => {
    trainer1 = new Trainer({
      id: "1",
      name: "Ash",
      city: "Pallet Town",
      age: 18,
      level: 1,
      pokemons: [],
      items: [],
      league: null,
    });

    trainer2 = new Trainer({
      id: "2",
      name: "Misty",
      city: "Cerulean City",
      age: 20,
      level: 1,
      pokemons: [],
      items: [],
      league: null,
    });

    league = new League({
      id: "1",
      name: "Poke League",
      registrationFee: 100,
      prize: 1000,
    });

    tournament = new Tournament({
      id: "1",
      name: "Poke Global Tournament",
      description:
        "Poke Global Tournament is a global tournament for all trainers",
    });

    tournament.leagues = [league];
    tournament.trainers = [trainer1, trainer2];
  });

  it("should start an tournament", () => {
    expect(tournament.startedAt).toBeNull();

    tournament.start();
    expect(tournament.startedAt).not.toBeNull();
  });

  it("should finish an tournament", () => {
    expect(tournament.finishedAt).toBeNull();

    tournament.finish();
    expect(tournament.finishedAt).not.toBeNull();
  });

  it("should check if an tournament is finished", () => {
    expect(tournament.isFinished()).toBeFalsy();

    tournament.finish();
    expect(tournament.isFinished()).toBeTruthy();
  });

  it("should check if an tournament is equal to another tournament", () => {
    const tournament2 = new Tournament({
      id: "1",
      name: "Poke Global Tournament",
      description:
        "Poke Global Tournament is a global tournament for all trainers",
    });
    tournament2.leagues = [league];
    tournament2.trainers = [trainer1, trainer2];

    expect(tournament.equals(tournament2)).toBeTruthy();
  });

  it("should check if an tournament is not equal to another tournament", () => {
    const tournament2 = new Tournament({
      id: "2",
      name: "Poke Global Tournament",
      description:
        "Poke Global Tournament is a global tournament for all trainers",
    });
    tournament2.leagues = [league];
    tournament2.trainers = [trainer1, trainer2];

    expect(tournament.equals(tournament2)).toBeFalsy();
  });
});
