export interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
