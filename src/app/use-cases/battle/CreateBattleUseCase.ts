import { Battle } from "../../entities/battle/Battle";
import { League } from "../../entities/league/League";
import { Trainer } from "../../entities/trainer/Trainer";
import { BattleRepository } from "../../repositories/BattleRepository";
import crypto from "node:crypto";

interface CreateBattleRequest {
  trainer1: Trainer;
  trainer2: Trainer;
  league: League;
}
export class CreateBattleUseCase {
  constructor(private battleRepository: BattleRepository) {}

  async execute({ trainer1, trainer2, league }: CreateBattleRequest) {
    if (trainer1.pokemons.length < 3 || trainer2.pokemons.length < 3) {
      throw new Error("Trainers must have at least 3 pokemons to battle");
    }

    if (!trainer1.league || !trainer2.league) {
      throw new Error("Trainers must be in a league to battle");
    }

    if (trainer1.league.id !== trainer2.league.id) {
      throw new Error("Trainers must be from the same league to battle");
    }

    if (trainer1.league.id !== league.id || trainer2.league.id !== league.id) {
      throw new Error("Trainers must be from the league to battle");
    }

    if (trainer1.id === trainer2.id) {
      throw new Error("Trainers must be different to battle");
    }

    const battle = new Battle({
      id: crypto.randomUUID(),
      trainer1,
      trainer2,
      league,
    });

    battle.createdAt = new Date();

    await this.battleRepository.save(battle);

    return battle;
  }
}
