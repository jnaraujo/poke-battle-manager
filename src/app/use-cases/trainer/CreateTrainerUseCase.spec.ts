import { beforeEach, describe, expect, it } from "vitest";
import { CreateTrainerUseCase } from "./CreateTrainerUseCase";
import { InMemoryTrainerRepository } from "../../__tests__/repositories/InMemoryTrainerRepository";

describe("CreateTrainerUseCase", () => {
  let createTrainerUseCase: CreateTrainerUseCase;
  let inMemoryTrainerRepository: InMemoryTrainerRepository;

  beforeEach(() => {
    inMemoryTrainerRepository = new InMemoryTrainerRepository();
    createTrainerUseCase = new CreateTrainerUseCase(inMemoryTrainerRepository);
  });

  it("should create a trainer", async () => {
    const trainer = await createTrainerUseCase.execute({
      name: "Ash",
      city: "Pallet",
      age: 10,
      level: 1,
      pokemons: [],
      items: [],
      league: null,
    });

    const response = await inMemoryTrainerRepository.findById(trainer.id);

    expect(response).toStrictEqual(trainer);
  });
});
