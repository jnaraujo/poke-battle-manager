import { Event } from "../entities/event/Event";
import { Repository } from "./Repository";

export interface EventRepository extends Repository<Event> {}
