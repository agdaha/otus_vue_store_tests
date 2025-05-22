import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";

export const productsStore = defineStore("products", () => {
  const isLoading = ref(false);
  const products = ref([]);

  const val = localStorage.getItem("products");
  if (val) {
    products.value = JSON.parse(val);
    isLoading.value = false;
  } else {
    isLoading.value = true;
  }

  const updateCatalog = () => {
    axios.get("https://fakestoreapi.com/products").then((resp) => {
      products.value = resp.data;
      localStorage.setItem("products", JSON.stringify(resp.data));
      isLoading.value = false;
    });
  };

  function getProductById (id) {
    return products.value.find((product) => product.id == id);
  };

  const getProducts = () => {
    return products.value;
  };

  return { isLoading, updateCatalog, getProducts, getProductById };
});
