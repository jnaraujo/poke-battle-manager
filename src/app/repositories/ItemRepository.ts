import { Item } from "../entities/item/Item";
import { Repository } from "./Repository";

export interface ItemRepository extends Repository<Item> {}
