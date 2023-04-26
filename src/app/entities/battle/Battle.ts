import { Trainer } from "../trainer/Trainer";

export class Battle {
  _id: string;
  _trainer1: Trainer;
  _trainer2: Trainer;
  _winner: Trainer | null;
  _loser: Trainer | null;
  _createdAt: Date | null;
  _startedAt: Date | null;
  _finishedAt: Date | null;

  constructor(props: { id: string; trainer1: Trainer; trainer2: Trainer }) {
    this._id = props.id;
    this._trainer1 = props.trainer1;
    this._trainer2 = props.trainer2;

    this._winner = null;
    this._loser = null;
    this._createdAt = null;
    this._startedAt = null;
    this._finishedAt = null;
  }

  // Methods

  start(): void {
    this._startedAt = new Date();
  }

  finish(winner: Trainer, loser: Trainer): void {
    this._finishedAt = new Date();
    this._winner = winner;
    this._loser = loser;
  }

  isFinished(): boolean {
    return this._finishedAt !== null;
  }

  equals(battle: Battle): boolean {
    return this._id === battle.id;
  }

  // getters and setters

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get trainer1() {
    return this._trainer1;
  }

  set trainer1(trainer1: Trainer) {
    this._trainer1 = trainer1;
  }

  get trainer2() {
    return this._trainer2;
  }

  set trainer2(trainer2: Trainer) {
    this._trainer2 = trainer2;
  }

  get winner() {
    return this._winner;
  }

  set winner(winner: Trainer | null) {
    this._winner = winner;
  }

  get loser() {
    return this._loser;
  }

  set loser(loser: Trainer | null) {
    this._loser = loser;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt: Date | null) {
    this._createdAt = createdAt;
  }

  get startedAt() {
    return this._startedAt;
  }

  set startedAt(startedAt: Date | null) {
    this._startedAt = startedAt;
  }

  get finishedAt() {
    return this._finishedAt;
  }

  set finishedAt(finishedAt: Date | null) {
    this._finishedAt = finishedAt;
  }
}
