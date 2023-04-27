import { beforeEach, describe, expect, it } from "vitest";
import { LeagueRepository } from "../../repositories/LeagueRepository";
import { SignUpTrainerToLeagueUseCase } from "./SignUpTrainerToLeagueUseCase";
import { InMemoryLeagueRepository } from "../../__tests__/repositories/InMemoryLeagueRepository";
import { Trainer } from "../../entities/trainer/Trainer";
import { League } from "../../entities/league/League";

describe("SignUpTrainerToLeagueUseCase", () => {
  let leagueRepository: LeagueRepository;
  let signUpTrainerToLeagueUseCase: SignUpTrainerToLeagueUseCase;
  let trainer: Trainer;
  let league: League;

  beforeEach(() => {
    leagueRepository = new InMemoryLeagueRepository();
    signUpTrainerToLeagueUseCase = new SignUpTrainerToLeagueUseCase(
      leagueRepository
    );

    trainer = new Trainer({
      id: "1",
      name: "Ash",
      city: "Pallet Town",
      age: 18,
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
  });

  it("should sign up a trainer to a league", async () => {
    await leagueRepository.save(league);

    expect(league.trainers).not.contains(trainer);

    await signUpTrainerToLeagueUseCase.execute({
      trainer,
      league,
    });

    expect(league.trainers).contains(trainer);
  });

  it("should throw an error if league is finished", async () => {
    league.finish();

    await leagueRepository.save(league);

    await expect(
      signUpTrainerToLeagueUseCase.execute({
        trainer,
        league,
      })
    ).rejects.toThrow("League is finished");
  });

  it("should throw an error if trainer is already signed up", async () => {
    league.trainers.push(trainer);

    await expect(
      signUpTrainerToLeagueUseCase.execute({
        trainer,
        league,
      })
    ).rejects.toThrow("Trainer is already signed up");
  });
});
