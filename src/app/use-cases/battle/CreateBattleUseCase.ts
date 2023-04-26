import { Battle } from "../../entities/battle/Battle";
import { Trainer } from "../../entities/trainer/Trainer";
import { BattleRepository } from "../../repositories/BattleRepository";

interface CreateBattleRequest {
  trainer1: Trainer;
  trainer2: Trainer;
}
export class CreateBattleUseCase {
  constructor(private battleRepository: BattleRepository) {}

  async execute({ trainer1, trainer2 }: CreateBattleRequest) {
    if (trainer1.pokemons.length < 3 || trainer2.pokemons.length < 3) {
      throw new Error("Trainers must have at least 3 pokemons to battle");
    }

    if (trainer1.league !== trainer2.league) {
      throw new Error("Trainers must be from the same league to battle");
    }

    if (trainer1.id === trainer2.id) {
      throw new Error("Trainers must be different to battle");
    }

    const battle = new Battle({
      id: crypto.randomUUID(),
      trainer1,
      trainer2,
    });

    battle.createdAt = new Date();

    await this.battleRepository.save(battle);

    return battle;
  }
}
