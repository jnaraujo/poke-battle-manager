export class Item {
  _id: string;
  _name: string;
  _increaseLife: number;
  _increaseAttack: number;
  _increaseDefense: number;
  _increaseSpeed: number;

  constructor(props: {
    id: string;
    name: string;
    increaseLife: number;
    increaseAttack: number;
    increaseDefense: number;
    increaseSpeed: number;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._increaseLife = props.increaseLife;
    this._increaseAttack = props.increaseAttack;
    this._increaseDefense = props.increaseDefense;
    this._increaseSpeed = props.increaseSpeed;
  }

  // Getters and setters

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get increaseLife(): number {
    return this._increaseLife;
  }

  set increaseLife(increaseLife: number) {
    this._increaseLife = increaseLife;
  }

  get increaseAttack(): number {
    return this._increaseAttack;
  }

  set increaseAttack(increaseAttack: number) {
    this._increaseAttack = increaseAttack;
  }

  get increaseDefense(): number {
    return this._increaseDefense;
  }

  set increaseDefense(increaseDefense: number) {
    this._increaseDefense = increaseDefense;
  }

  get increaseSpeed(): number {
    return this._increaseSpeed;
  }

  set increaseSpeed(increaseSpeed: number) {
    this._increaseSpeed = increaseSpeed;
  }

  // Methods

  equals(item: Item): boolean {
    return this._id === item.id;
  }
}
