export interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
