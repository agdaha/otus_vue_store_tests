<script setup>
  import Card from "../components/Card.vue";
  import SearchPanel from "../components/SearchPanel.vue";
  import { ref, computed, onBeforeMount } from "vue";
  import { productsStore } from "../stories/products";
  import { useRouter } from "vue-router";
  import { cartStore } from "../stories/cart";

  const router = useRouter();
  const cart = cartStore();
  const products = productsStore();

  onBeforeMount(() => {
    products.updateCatalog();
  });

  const searchString = ref("");

  const filteredProducts = computed(() => {
    return products
      .getProducts()
      .filter((itm) =>
        itm.title.toLowerCase().includes(searchString.value.toLowerCase())
      );
  });

  const addCart = function (product) {
    cart.addToCart(product, 1);
  };

  const addNewProduct = function () {
    router.push({ name: "newProduct" });
  };
</script>

<template>
  <main>
    <div class="products-header">
      <h2>Товары</h2>
      <button @click="addNewProduct">Add New Product</button>
      <search-panel @onsearch="(name) => (searchString = name)"></search-panel>
    </div>

    <div v-if="isLoading">
      <h3>Loading...</h3>
    </div>
    <div v-else class="products">
      <card
        class="product-card"
        @addCart="addCart"
        :product="product"
        v-for="product in filteredProducts"
        :key="product.id"
      />
    </div>
  </main>
</template>

<style scoped>
.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.products {
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: stretch;
  justify-content: flex-start;
  transform: translateZ(0);
}
</style>