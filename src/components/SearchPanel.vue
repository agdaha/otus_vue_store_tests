<script setup>
  import { ref } from "vue";
  const name = ref("");
  const emit = defineEmits(["onsearch"]);
</script>

<template>
  <div class="search-panel">
    <label>Поиск по названию: </label>
    <input type="text" v-model="name" @keyup.enter="$emit('onsearch', name)" />
    <button @click="$emit('onsearch', name)">Найти</button>
  </div>
</template>

<style  scoped>
.search-panel {
  padding-right: 40px;
}
</style>