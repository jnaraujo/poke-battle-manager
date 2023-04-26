import { beforeEach, describe, expect, it } from "vitest";
import { League } from "../league/League";
import { Trainer } from "../trainer/Trainer";
import { Battle } from "../battle/Battle";
import { Event } from "./Event";

describe("Event", () => {
  let event: Event;
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

    event = new Event({
      id: "1",
      name: "Poke Global Event",
      description: "Poke Global Event is a global event for all trainers",
      leagues: [league],
      trainers: [trainer1, trainer2],
    });
  });

  it("should start an event", () => {
    expect(event.startedAt).toBeNull();

    event.start();
    expect(event.startedAt).not.toBeNull();
  });

  it("should finish an event", () => {
    expect(event.finishedAt).toBeNull();

    event.finish();
    expect(event.finishedAt).not.toBeNull();
  });

  it("should check if an event is finished", () => {
    expect(event.isFinished()).toBeFalsy();

    event.finish();
    expect(event.isFinished()).toBeTruthy();
  });

  it("should check if an event is equal to another event", () => {
    const event2 = new Event({
      id: "1",
      name: "Poke Global Event",
      description: "Poke Global Event is a global event for all trainers",
      leagues: [league],
      trainers: [trainer1, trainer2],
    });

    expect(event.equals(event2)).toBeTruthy();
  });

  it("should check if an event is not equal to another event", () => {
    const event2 = new Event({
      id: "2",
      name: "Poke Global Event",
      description: "Poke Global Event is a global event for all trainers",
      leagues: [league],
      trainers: [trainer1, trainer2],
    });

    expect(event.equals(event2)).toBeFalsy();
  });
});
