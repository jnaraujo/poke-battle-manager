import { Battle } from "../battle/Battle";
import { Trainer } from "../trainer/Trainer";

export class League {
  _id: string;
  _name: string;
  _createdAt: Date | null;
  _startedAt: Date | null;
  _finishedAt: Date | null;
  _registrationFee: number;
  _prize: number;

  constructor(props: {
    id: string;
    name: string;
    registrationFee: number;
    prize: number;
  }) {
    this._id = props.id;
    this._registrationFee = props.registrationFee;
    this._prize = props.prize;
    this._name = props.name;

    this._createdAt = null;
    this._startedAt = null;
    this._finishedAt = null;
  }

  // Methods

  start(): void {
    this._startedAt = new Date();
  }

  finish(): void {
    this._finishedAt = new Date();
  }

  isFinished(): boolean {
    return this._finishedAt !== null;
  }

  equals(battle: League): boolean {
    return this._id === battle.id;
  }

  // getters and setters

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  set createdAt(value: Date | null) {
    this._createdAt = value;
  }

  get startedAt(): Date | null {
    return this._startedAt;
  }

  set startedAt(value: Date | null) {
    this._startedAt = value;
  }

  get finishedAt(): Date | null {
    return this._finishedAt;
  }

  set finishedAt(value: Date | null) {
    this._finishedAt = value;
  }

  get registrationFee(): number {
    return this._registrationFee;
  }

  set registrationFee(value: number) {
    this._registrationFee = value;
  }

  get prize(): number {
    return this._prize;
  }

  set prize(value: number) {
    this._prize = value;
  }
}
