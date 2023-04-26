import { describe, it, expect, beforeEach } from "vitest";
import { Item } from "./Item";

describe("Item", () => {
  let item: Item;

  beforeEach(() => {
    item = new Item({
      id: "1",
      name: "Potion",
      increaseLife: 20,
      increaseAttack: 0,
      increaseDefense: 0,
      increaseSpeed: 0,
    });
  });

  it("should be created", () => {
    expect(item).toBeDefined();
  });

  it("should be equals", () => {
    const item2 = new Item({
      id: "1",
      name: "Potion",
      increaseLife: 20,
      increaseAttack: 0,
      increaseDefense: 0,
      increaseSpeed: 0,
    });

    expect(item.equals(item2)).toBeTruthy();
  });

  it("should not be equals", () => {
    const item2 = new Item({
      id: "2",
      name: "Potion",
      increaseLife: 20,
      increaseAttack: 0,
      increaseDefense: 0,
      increaseSpeed: 0,
    });

    expect(item.equals(item2)).toBeFalsy();
  });
});
