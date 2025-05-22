import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const cartStore = defineStore("cart", () => {
  const _cart = ref([]);

  const getCart = () => {
    return _cart.value;
  };

  const getSumCart = computed(() => {
    return _cart.value
      .reduce((sum, item) => sum + item.count * item.price, 0.00)
      .toFixed(2);
  });

  const getCountItems = computed(() => {
    return _cart.value.reduce((count, item) => count + item.count, 0);
  });

  const getCountById = (id) => {
    const i = _cart.value.findIndex((item) => item.id === id);
    if (i !== -1) {
      return _cart.value[i].count;
    } else {
      return 0;
    }
  };

  const addToCart = (product, addedCount) => {
    const i = _cart.value.findIndex((item) => item.id === product.id);
    if (i === -1) {
      _cart.value.push({ ...product, count: addedCount });
    } else {
      _cart.value[i].count += addedCount;
    }
  };

  const removeFromCart = (product) => {
    const i = _cart.value.findIndex((item) => item.id === product.id);
    if (i !== -1) {
      _cart.value.splice(i, 1);
    }
  };

  const clearCart = () => {
    _cart.value = [];
  };

  return {getCart, getSumCart, getCountItems, getCountById, addToCart, removeFromCart, clearCart};
});
