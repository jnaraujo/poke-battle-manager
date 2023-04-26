import { isEqual } from "lodash";
import { PokemonMove } from "../../value_objects/PokemonMove";
import { BattleStats } from "../../value_objects/BattleStats";

export class Pokemon {
  private _id: string;
  private _name: string;
  private _level: number;
  private _life: number;
  private _type: string[];
  private _trainerID: string;
  private _stats: BattleStats;
  private _moves: PokemonMove[];

  constructor(props: {
    id: string;
    name: string;
    level: number;
    life: number;
    type: string[];
    trainerID: string;
    stats: BattleStats;
    moves: PokemonMove[];
  }) {
    this._id = props.id;
    this._name = props.name;
    this._level = props.level;
    this._life = props.life;
    this._type = props.type;
    this._trainerID = props.trainerID;
    this._stats = props.stats;
    this._moves = props.moves;
  }

  // Predicates

  isAwake(): boolean {
    return this.life > 0;
  }

  // Actions

  attack(target: Pokemon): void {
    const damage = this._stats.attack - target.stats.defense;

    if (damage > 0) {
      target.life -= damage;
    }

    if (target.life < 0) {
      target.life = 0;
    }
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

  get level(): number {
    return this._level;
  }

  set level(level: number) {
    this._level = level;
  }

  get life(): number {
    return this._life;
  }

  set life(life: number) {
    this._life = life;
  }

  get type(): string[] {
    return this._type;
  }

  set type(type: string[]) {
    this._type = type;
  }

  get trainerID(): string {
    return this._trainerID;
  }

  set trainerID(trainerID: string) {
    this._trainerID = trainerID;
  }

  get stats(): BattleStats {
    return this._stats;
  }

  set stats(stats: BattleStats) {
    this._stats = stats;
  }

  get moves(): PokemonMove[] {
    return this._moves;
  }

  set moves(moves: PokemonMove[]) {
    this._moves = moves;
  }

  // Equals

  equals(other: Pokemon): boolean {
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.level === other.level &&
      this.trainerID === other.trainerID &&
      this.stats.equals(other.stats) &&
      isEqual(this.type, other.type) &&
      isEqual(this.moves, other.moves)
    );
  }
}
