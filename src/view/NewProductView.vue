<script setup>
  import { useForm } from "vee-validate";
  import * as yup from "yup";

  const { values, resetForm, meta, setValues, errors, defineField } = useForm({
    validationSchema: yup.object({
      title: yup
        .string()
        .required("Обязательное поле")
        .min(10, "не менее 10 символов")
        .max(120, "не более 120 символов"),
      description: yup.string().default(""),
      price: yup.number().required("Обязательное поле"),
      image: yup.string().url(),
      category: yup.string(),
      rating: yup.object({
        stars: yup.number().default(0),
        count: yup.number().default(0),
      }),
    }),
  });

  const [title, titleAttrs] = defineField("title");
  const [description, descriptionAttrs] = defineField("description");
  const [price, priceAttrs] = defineField("price");
  const [image, imageAttrs] = defineField("image");
  const [category, categoryAttrs] = defineField("category");
</script>

<template>
  <h1>New Product</h1>
  <div class="form">
    <div class="form-group">
      <label for="title">Title</label>
      <input v-bind="titleAttrs" v-model="title" type="text" />
      <span class="error">{{ errors.title }}</span>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea v-bind="descriptionAttrs" v-model="description"></textarea>
      <span class="error">{{ errors.description }}</span>
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input v-bind="priceAttrs" v-model="price" type="number" step="0.01" />
      <span class="error">{{ errors.price }}</span>
    </div>
    <div class="form-group">
      <label for="image">Image</label>
      <input v-bind="imageAttrs" v-model="image" type="url" />
      <span class="error">{{ errors.image }}</span>
    </div>
    <div class="form-group">
      <label for="category">Category</label>
      <input type="text" v-model="category" v-bind="categoryAttrs" />
      <span class="error">{{ errors.category }}</span>
    </div>
    <div class="form-group">
      <button :disabled="!meta.valid">Сохранить</button>
    </div>
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px;
  border-style: dashed;
  max-width: 900px;
}
.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-group input,
textarea {
  min-width: 450px;
}
.form-group label {
  font-size: large;
  padding: 10px;
}
</style>
