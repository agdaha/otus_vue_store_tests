<script setup>
  import { cartStore } from "../stories/cart";
  import { computed } from "vue";
  defineEmits(["onclick"]);

  const cart = cartStore();

  const itemCount = computed(() => {
    return cart.getCountItems;
  });
  const sumCart = computed(() => {
    return cart.getSumCart;
  });
</script>

<template>
  <div class="cart" @click="$emit('onclick')">
    <div class="cart-img">
      <img src="../assets/img/cart.svg" width="32" height="32" />
    </div>
    <div class="cart-info">
      <span> {{ itemCount }} items</span>
      <span> ${{ sumCart }}</span>
    </div>
  </div>
</template>  

<style scoped lang="scss">
.cart {
  display: flex;
  align-items: flex-end;
}

.cart:hover {
  cursor: pointer;
}

.cart-info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
}
</style>