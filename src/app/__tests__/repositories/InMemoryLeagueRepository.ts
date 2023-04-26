import { League } from "../../entities/league/League";
import { LeagueRepository } from "../../repositories/LeagueRepository";

export class InMemoryLeagueRepository implements LeagueRepository {
  private leagues: League[] = [];

  async findAll() {
    return this.leagues;
  }
  async findById(id: string) {
    return this.leagues.find((league) => league.id === id) || null;
  }
  async save(entity: League) {
    this.leagues.push(entity);
  }
  async delete(entity: League) {
    this.leagues = this.leagues.filter((league) => league.id !== entity.id);
  }
  async update(entity: League) {
    const index = this.leagues.findIndex((league) => league.id === entity.id);
    this.leagues[index] = entity;
  }
}
