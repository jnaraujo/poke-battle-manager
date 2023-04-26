import { Trainer } from "../../entities/trainer/Trainer";
import { TrainerRepository } from "../../repositories/Trainer";

export class InMemoryTrainerRepository implements TrainerRepository {
  private trainers: Trainer[] = [];

  async findAll() {
    return this.trainers;
  }
  async findById(id: string) {
    return this.trainers.find((trainer) => trainer.id === id) || null;
  }
  async save(entity: Trainer) {
    this.trainers.push(entity);
  }
  async delete(entity: Trainer) {
    this.trainers = this.trainers.filter((trainer) => trainer.id !== entity.id);
  }
  async update(entity: Trainer) {
    const index = this.trainers.findIndex(
      (trainer) => trainer.id === entity.id
    );
    this.trainers[index] = entity;
  }
}
