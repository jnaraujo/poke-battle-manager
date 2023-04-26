export class BattleStats {
  private _attack: number;
  private _defense: number;
  private _speed: number;

  constructor(props: { attack: number; defense: number; speed: number }) {
    this._attack = props.attack;
    this._defense = props.defense;
    this._speed = props.speed;
  }
  get attack() {
    return this._attack;
  }

  get defense() {
    return this._defense;
  }

  get speed() {
    return this._speed;
  }

  equals(other: BattleStats): boolean {
    return (
      this.attack === other.attack &&
      this.defense === other.defense &&
      this.speed === other.speed
    );
  }
}
