<script setup>
  import { computed, ref } from "vue";
  import { useRoute } from "vue-router";
  import { productsStore } from "../stories/products";
  import { cartStore } from "../stories/cart";

  const products = productsStore();
  const cart = cartStore();

  const addCart = (product) => {
    cart.addToCart(product, 1);
  };

  const route = useRoute();

  const product = computed(()=>{
    const id = route.params["productId"];
    
    return products.getProductById(id);
  });


  const InCart = computed(() => {
    return cart.getCountById(product.value.id);
  });
</script>

<template>
  <h2>
    <router-link :to="{ name: 'home' }">Товары</router-link> >
    {{ product.title }}
  </h2>
  <div class="wrapper">
    <div class="image">
      <img :src="product.image" :alt="product.title" height="600" />
    </div>
    <div class="container">
      <div class="title">{{ product.title }}</div>
      <div class="category">{{ product.category }}</div>
      <div class="description">{{ product.description }}</div>
      <div class="price">Price: ${{ product.price }}</div>
    </div>
  </div>
  <div class="cart-button">
    <button @click="addCart(product)">🛒</button>
    <div v-if="InCart > 0" class="incart">В корзине:&nbsp; {{ InCart }}</div>
  </div>
</template>

<style scoped>
.image {
  /* max-height: 600px; */
  aspect-ratio: 1 / 1;
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

img {
  width: 90%;
  height: auto;
  align-self: center;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 60px;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.category {
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
}

.description {
  font-size: 20px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
}

.incart {
  display: flex;
  font-weight: 300;
  font-size: small;
}

.incart {
  color: #1b75bc;
  font-weight: bold;
}

.cart-button {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 20px;
  margin-top: auto;
  width: 100%;
}

.cart-button > button {
  padding: 2px 20px;
}
</style>