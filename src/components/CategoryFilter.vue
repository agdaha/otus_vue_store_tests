<script setup>
  const emit = defineEmits(["toggle"]);
  const props = defineProps(["categoryList"]);
</script>

<template>
  <h2>Категории</h2>
  <div class="filter">
    <div v-for="category in categoryList" :key="category">
      <input
        type="checkbox"
        :name="category[0]"
        v-model="category[1]"
        @change="emit('toggle', category)"
      /><span class="category-name">{{ category[0] }}</span>
    </div>
  </div>
</template>

<style scoped>
.filter {
  margin: 0 20px;
}
.category-name {
  padding-left: 10px;
}
</style>