import { League } from "../../entities/league/League";
import { Trainer } from "../../entities/trainer/Trainer";
import { LeagueRepository } from "../../repositories/LeagueRepository";

interface SignUpTrainerToLeagueRequest {
  trainer: Trainer;
  league: League;
}
export class SignUpTrainerToLeagueUseCase {
  constructor(private leagueRepository: LeagueRepository) {}

  async execute({ trainer, league }: SignUpTrainerToLeagueRequest) {
    if (league.isFinished()) {
      throw new Error("League is finished");
    }

    if (league.trainers.find((t) => t.id === trainer.id)) {
      throw new Error("Trainer is already signed up");
    }

    league.trainers.push(trainer);

    await this.leagueRepository.save(league);

    return league;
  }
}
