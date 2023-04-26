import { Battle } from "../../entities/battle/Battle";
import { BattleRepository } from "../../repositories/BattleRepository";

export class InMemoryBattleRepository implements BattleRepository {
  private battles: Battle[] = [];

  async findAll() {
    return this.battles;
  }
  async findById(id: string) {
    return this.battles.find((battle) => battle.id === id) || null;
  }
  async save(entity: Battle) {
    this.battles.push(entity);
  }
  async delete(entity: Battle) {
    this.battles = this.battles.filter((battle) => battle.id !== entity.id);
  }
  async update(entity: Battle) {
    const index = this.battles.findIndex((battle) => battle.id === entity.id);
    this.battles[index] = entity;
  }
}
