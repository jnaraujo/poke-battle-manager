import { Tournament } from "../../entities/tournament/Tournament";
import { Trainer } from "../../entities/trainer/Trainer";
import { TournamentRepository } from "../../repositories/TournamentRepository";

interface SignUpTrainerToTournamentRequest {
  trainer: Trainer;
  tournament: Tournament;
}

export class SignUpTrainerToTournamentUseCase {
  constructor(private tournamentRepository: TournamentRepository) {}

  async execute(request: SignUpTrainerToTournamentRequest) {
    const { trainer, tournament } = request;

    if (tournament.isFinished()) {
      throw new Error("Tournament is finished");
    }

    if (tournament.trainers.find((t) => t.id === trainer.id)) {
      throw new Error("Trainer is already signed up");
    }

    tournament.trainers.push(trainer);

    await this.tournamentRepository.save(tournament);

    return tournament;
  }
}
