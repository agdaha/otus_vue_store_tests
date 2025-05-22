import { cartStore } from './cart';
import { expect, describe, beforeEach, it } from 'vitest';
import { createPinia } from "pinia";
import { createApp } from "vue";

describe('cartStore', () => {
  let store;
  const pinia = createPinia();
  const app = createApp();
  app.use(pinia);
  beforeEach(() => {
    store = cartStore();
  });

  it('should return an empty cart', () => {
    expect(store.getCart()).toEqual([]);
  });

  it('should return 0 as sum of cart', () => {
    expect(store.getSumCart).toBe("0.00");
  });

  it('should return 0 as count of items', () => {
    expect(store.getCountItems).toBe(0);
  });

  it('should return 0 as count of items by id', () => {
    expect(store.getCountById(1)).toBe(0);
  });

  it('should add product to cart', () => {
    const product = { id: 1, count: 1, price: 10 };
    store.addToCart(product, 1);
    expect(store.getCart()).toEqual([product]);
  });

  it('should remove product from cart', () => {
    const product = { id: 1, count: 1, price: 10 };
    store.addToCart(product, 1);
    store.removeFromCart(product);
    expect(store.getCart()).toEqual([]);
  });

  it('should clear cart', () => {
    const product = { id: 1, count: 1, price: 10 };
    store.addToCart(product, 1);
    store.clearCart();
    expect(store.getCart()).toEqual([]);
  });

  it('should handle edge cases', () => {
    const product = { id: 1, count: 1, price: 10 };
    store.addToCart(product, 1);
    store.addToCart(product, 1);
    expect(store.getCountById(1)).toBe(2);
    store.removeFromCart(product);
    expect(store.getCountById(0)).toBe(0);
    store.clearCart();
    expect(store.getCart()).toEqual([]);
  });
});