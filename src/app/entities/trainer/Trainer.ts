import { BattleStats } from "../../value_objects/BattleStats";
import { Item } from "../item/Item";
import { Pokemon } from "../pokemon/Pokemon";

export class Trainer {
  _id: string;
  _name: string;
  _city: string;
  _age: number;
  _level: number;
  _pokemons: Pokemon[];
  _items: Item[];
  _league: string;

  constructor(props: {
    id: string;
    name: string;
    city: string;
    age: number;
    level: number;
    pokemons: Pokemon[];
    items: Item[];
    league: string;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._city = props.city;
    this._age = props.age;
    this._level = props.level;
    this._pokemons = props.pokemons;
    this._items = props.items;
    this._league = props.league;
  }

  // Methods

  addPokemon(pokemon: Pokemon) {
    this._pokemons.push(pokemon);
  }

  removePokemon(pokemon: Pokemon): void {
    this._pokemons = this._pokemons.filter((p) => p.equals(pokemon));
  }

  addItem(item: Item) {
    this._items.push(item);
  }

  removeItem(item: Item): void {
    this._items = this._items.filter((i) => i.equals(item));
  }

  applyItem(item: Item, pokemon: Pokemon): void {
    pokemon.life += item.increaseLife;

    const newStats = new BattleStats({
      attack: pokemon.stats.attack + item.increaseAttack,
      defense: pokemon.stats.defense + item.increaseDefense,
      speed: pokemon.stats.speed + item.increaseSpeed,
    });

    pokemon.stats = newStats;
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

  get city(): string {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get age(): number {
    return this._age;
  }

  set age(age: number) {
    this._age = age;
  }

  get level(): number {
    return this._level;
  }

  set level(level: number) {
    this._level = level;
  }

  get pokemons() {
    return this._pokemons;
  }

  set pokemon(pokemon: Pokemon[]) {
    this._pokemons = pokemon;
  }

  get items() {
    return this._items;
  }

  set items(items: Item[]) {
    this._items = items;
  }

  get league(): string {
    return this._league;
  }

  set league(league: string) {
    this._league = league;
  }
}
