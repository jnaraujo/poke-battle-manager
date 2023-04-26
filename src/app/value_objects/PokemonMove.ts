export class PokemonMove {
  private _name: string;
  private _type: string;
  private _category: string;
  private _power: number;
  private _accuracy: number;
  private _powerPoints: number;

  constructor(props: {
    name: string;
    type: string;
    category: string;
    power: number;
    accuracy: number;
    powerPoints: number;
  }) {
    this._name = props.name;
    this._type = props.type;
    this._category = props.category;
    this._power = props.power;
    this._accuracy = props.accuracy;
    this._powerPoints = props.powerPoints;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get category() {
    return this._category;
  }

  get power() {
    return this._power;
  }

  get accuracy() {
    return this._accuracy;
  }

  get powerPoints() {
    return this._powerPoints;
  }
}
