import { Tournament } from "../../entities/tournament/Tournament";
import { TournamentRepository } from "../../repositories/TournamentRepository";

export class InMemoryTournamentRepository implements TournamentRepository {
  private tournaments: Tournament[] = [];

  async save(tournament: Tournament) {
    this.tournaments.push(tournament);
  }

  async findAll() {
    return this.tournaments;
  }

  async findById(id: string) {
    return this.tournaments.find((tournament) => tournament.id === id) || null;
  }

  async delete(entity: Tournament) {
    this.tournaments = this.tournaments.filter(
      (tournament) => tournament.id !== entity.id
    );
  }
  async update(entity: Tournament) {
    const index = this.tournaments.findIndex(
      (tournament) => tournament.id === entity.id
    );
    this.tournaments[index] = entity;
  }
}
