import { beforeEach, describe, expect, it } from "vitest";
import { Trainer } from "../../entities/trainer/Trainer";
import { Tournament } from "../../entities/tournament/Tournament";
import { SignUpTrainerToTournamentUseCase } from "./SignUpTrainerToTournamentUseCase";
import { InMemoryTournamentRepository } from "../../__tests__/repositories/InMemoryTournamentRepository";

describe("SignUpTrainerToTournamentUseCase", () => {
  let tournament: Tournament;
  let trainer: Trainer;

  beforeEach(() => {
    tournament = new Tournament({
      id: "tournament-id",
      name: "tournament-name",
      description: "tournament-description",
      trainers: [],
      leagues: [],
    });

    trainer = new Trainer({
      id: "trainer-id",
      name: "trainer-name",
      city: "trainer-city",
      age: 10,
      level: 1,
      pokemons: [],
      items: [],
      league: null,
    });
  });
  it("should sign up trainer to tournament", async () => {
    const signUpTrainerToTournamentUseCase =
      new SignUpTrainerToTournamentUseCase(new InMemoryTournamentRepository());

    const response = await signUpTrainerToTournamentUseCase.execute({
      tournament,
      trainer,
    });

    expect(response.trainers).toContain(trainer);
  });

  it("should throw error if tournament is finished", async () => {
    const signUpTrainerToTournamentUseCase =
      new SignUpTrainerToTournamentUseCase(new InMemoryTournamentRepository());

    tournament.finish();

    await expect(
      signUpTrainerToTournamentUseCase.execute({
        tournament,
        trainer,
      })
    ).rejects.toThrow("Tournament is finished");
  });

  it("should throw error if trainer is already signed up", async () => {
    const signUpTrainerToTournamentUseCase =
      new SignUpTrainerToTournamentUseCase(new InMemoryTournamentRepository());

    tournament.trainers.push(trainer);

    await expect(
      signUpTrainerToTournamentUseCase.execute({
        tournament,
        trainer,
      })
    ).rejects.toThrow("Trainer is already signed up");
  });
});
