<script setup>
  import CartView from "./CartView.vue";
  import { useForm } from "vee-validate";
  import * as yup from "yup";
  import axios from "axios";
  import { useToast } from "vue-toastification";
  import { useRouter } from "vue-router";
  import { cartStore } from "../stories/cart";

  const cart = cartStore();
  const emit = defineEmits(["close", "sending"]);
  const toast = useToast();
  const router = useRouter();

  const { values, resetForm, meta, setValues, errors, defineField } = useForm({
    validationSchema: yup.object({
      fio: yup
        .string()
        .required("Обязательное поле")
        .min(10, "не менее 10 символов")
        .max(100, "не более 100 символов"),
      email: yup
        .string()
        .email("некорректный формат")
        .required("Обязательное поле")
        .min(10, "не менее 10 символов")
        .max(50, "не более 50 символов"),
      birthday: yup
        .date()
        .required("Обязательное поле")
        .min("01.01.1940", "Минимальное значение 01.01.1940")
        .max("01.01.2007", "Слишком молод ещё"),
      pdchecked: yup
        .boolean()
        .required("Обязательное поле")
        .oneOf([true], "Обязательное поле"),
      cart: yup.object(),
    }),
  });

  const [fio, fioAttrs] = defineField("fio");
  const [birthday, birthdayAttrs] = defineField("birthday");
  const [email, emailAttrs] = defineField("email");
  const [pdchecked, pdcheckedAttrs] = defineField("pdchecked");

  const send = () => {
    setValues({
      cart: cart.getCart(),
    });
    axios
      .post("https://httpbin.org/post", values)
      .then((res) => {
        if (res.status === 200) {
          emit("sending");
          resetForm();
          cart.clearCart();
          toast.success("Заказ успешно отправлен!");
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Произошла ошибка!");
      });
  };
</script>

<template>
  <div class="checkout-container">
    <div class="wrapper">
      <cart-view :is-checkout="true"></cart-view>
    </div>

    <div class="wrapper">
      <h2>Оформление заказа</h2>
      <div class="field">
        <label class="field-label">ФИО: </label>
        <input
          v-model="fio"
          v-bind="fioAttrs"
          type="text"
          placeholder="Иванов Иван Иванович"
        />
      </div>
      <label class="errors">{{ errors["fio"] }}</label>
      <div class="field">
        <label class="field-label">Дата рождения:</label>
        <input type="date" v-model="birthday" v-bind="birthdayAttrs" />
      </div>
      <label class="errors">{{ errors["birthday"] }}</label>
      <div class="field">
        <label class="field-label">Email: </label>
        <input
          v-model="email"
          v-bind="emailAttrs"
          type="text"
          placeholder="name@domain.com"
        />
      </div>
      <label class="errors">{{ errors["email"] }}</label>
      <div class="field">
        <label class="field-label">Согасие на обработку ПД </label>
        <input v-model="pdchecked" type="checkbox" v-bind="pdcheckedAttrs" />
      </div>
      <label class="errors">{{ errors["pdchecked"] }}</label>
      <div class="buttons">
        <button class="btn-send" :disabled="!meta.valid" @click="send">
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  display: flex;
  gap: 60px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px;
  border-style: dashed;
  border-color: black;
  border-radius: 10px;
  padding: 10px;
}
.field {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px;
}
.field-label {
  padding: 0 10px;
}

.errors {
  color: red;
  font-size: smaller;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
}
</style>
