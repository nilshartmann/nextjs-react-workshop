import { it, expect } from "vitest";
import { updateShoppingCartImmer as updateShoppingCart } from "./updateShoppingCartImmer.ts";

type IShoppingCartItem = {
  productId: string;
  quantity: number;
};

type IShoppingCart = {
  username: string;
  items: IShoppingCartItem[];
};

function createCart(): IShoppingCart {
  return {
    username: "Klaus",
    items: [
      { productId: "P1", quantity: 2 },
      { productId: "P2", quantity: 1 },
    ],
  };
}

it("should add new item", () => {
  const cart = createCart();

  const newCart = updateShoppingCart(cart, "P3", 3);
  expect(newCart).not.toBe(cart);
  expect(newCart.username).toBe(cart.username); // should not be changed
  expect(newCart.items).not.toBe(cart.items); // original items must NOT be changed
  expect(newCart.items[0]).toBe(cart.items[0]); // should not be changed
  expect(newCart.items[1]).toBe(cart.items[1]); // should not be changed
  expect(newCart.items[2]).toStrictEqual({
    productId: "P3",
    quantity: 3,
  });
});

it("should change quantity item if amount is positive", () => {
  const cart = createCart();

  const newCart = updateShoppingCart(cart, "P1", 3);
  expect(newCart).not.toBe(cart);
  expect(newCart.username).toBe(cart.username); // should not be changed
  expect(newCart.items).not.toBe(cart.items); // original items must NOT be changed
  expect(newCart.items[0]).not.toBe(cart.items[0]); // should be NEW object!!
  expect(newCart.items[0]).toStrictEqual({
    productId: "P1",
    quantity: 5,
  });
  expect(newCart.items[1]).toBe(cart.items[1]); // must NOT be changed
});

it("should do nothing if amount is negative", () => {
  const cart = createCart();

  const newCart = updateShoppingCart(cart, "P1", -1);
  expect(newCart).toBe(cart);
  expect(newCart.username).toBe(cart.username); // should not be changed
  expect(newCart.items).toBe(cart.items); // original items must NOT be changed
  expect(newCart.items[0]).toBe(cart.items[0]); // should be NEW object!!
  expect(newCart.items[0]).toStrictEqual({
    productId: "P1",
    quantity: 2,
  });
  expect(newCart.items[1]).toBe(cart.items[1]); // must NOT be changed
});

it("should not change cart if amount is less than 1", () => {
  const cart = createCart();

  const newCart = updateShoppingCart(cart, "P3", -1); // P2 not in cart
  expect(newCart).toBe(cart);
  expect(newCart.items).toBe(cart.items);
  expect(newCart.items[0]).toBe(cart.items[0]); // must NOT be changed
  expect(newCart.items[1]).toBe(cart.items[1]); // must NOT be changed
  expect(newCart).toStrictEqual(cart);
});

it("should not change cart if amount is 0 for existing product", () => {
  const cart = createCart();

  const newCart = updateShoppingCart(cart, "P1", 0);
  expect(newCart).toBe(cart);
  expect(newCart.items).toBe(cart.items);
  expect(newCart.items[0]).toBe(cart.items[0]); // must NOT be changed
  expect(newCart.items[1]).toBe(cart.items[1]); // must NOT be changed
  expect(newCart).toStrictEqual(cart);
});
