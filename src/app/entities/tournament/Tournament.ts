import { League } from "../league/League";
import { Trainer } from "../trainer/Trainer";

export class Tournament {
  _id: string;
  _name: string;
  _description: string;
  _createdAt: Date | null;
  _startedAt: Date | null;
  _finishedAt: Date | null;
  _trainers: Trainer[];
  _leagues: League[];

  constructor(props: {
    id: string;
    name: string;
    description: string;
    trainers: Trainer[];
    leagues: League[];
  }) {
    this._id = props.id;
    this._name = props.name;
    this._description = props.description;
    this._trainers = props.trainers;
    this._leagues = props.leagues;

    this._createdAt = null;
    this._startedAt = null;
    this._finishedAt = null;
  }

  // Methods

  start() {
    this._startedAt = new Date();
  }

  finish() {
    this._finishedAt = new Date();
  }

  isFinished() {
    return this._finishedAt !== null;
  }

  equals(tournament: Tournament) {
    return this._id === tournament.id;
  }

  // getters and setters

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get description() {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
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

  get trainers() {
    return this._trainers;
  }

  set trainers(trainers: Trainer[]) {
    this._trainers = trainers;
  }

  get battles() {
    return this._leagues;
  }

  set battles(battles: League[]) {
    this._leagues = battles;
  }
}
