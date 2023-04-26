import { Item } from "../../entities/item/Item";
import { Pokemon } from "../../entities/pokemon/Pokemon";
import { Trainer } from "../../entities/trainer/Trainer";
import { TrainerRepository } from "../../repositories/Trainer";
import crypto from "node:crypto";

interface CreateTrainerRequest {
  name: string;
  city: string;
  age: number;
  level: number;
  pokemons: Pokemon[];
  items: Item[];
  league: string;
}
export class CreateTrainerUseCase {
  constructor(private trainerRepository: TrainerRepository) {}

  async execute(request: CreateTrainerRequest) {
    const trainer = new Trainer({
      id: crypto.randomUUID(),
      ...request,
    });

    await this.trainerRepository.save(trainer);

    return trainer;
  }
}
