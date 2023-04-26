import { Event } from "../../entities/event/Event";
import { EventRepository } from "../../repositories/EventRepository";

export class InMemoryEventRepository implements EventRepository {
  private events: Event[] = [];

  async save(event: Event) {
    this.events.push(event);
  }

  async findAll() {
    return this.events;
  }

  async findById(id: string) {
    return this.events.find((event) => event.id === id) || null;
  }

  async delete(entity: Event) {
    this.events = this.events.filter((event) => event.id !== entity.id);
  }
  async update(entity: Event) {
    const index = this.events.findIndex((event) => event.id === entity.id);
    this.events[index] = entity;
  }
}
