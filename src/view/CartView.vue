<script setup>
  import { useRouter } from "vue-router";
  import { cartStore } from "../stories/cart";

  defineEmits(["checkout"]);
  const cart = cartStore();
  const _cart = cart.getCart();
  const sumCart = cart.getSumCart;
  const router = useRouter();
  defineProps({ isCheckout: Boolean });

  const checkout = () => {
    router.push("/checkout");
  };
</script>

<template>
  <div class="cart-container">
    <h2>Ваша корзина</h2>

    <table v-if="sumCart > 0">
      <thead>
        <tr>
          <td class="td-title htext">Наименование</td>
          <td class="htext td-money">Цена</td>
          <td class="htext td-counter">Кол-во</td>
          <td class="htext td-money">Сумма</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in _cart" :key="item.id">
          <td class="td-title">{{ item.title }}</td>
          <td class="td-money">${{ item.price.toFixed(2) }}</td>
          <td class="td-counter">
            <input class="counter" type="number" min="0" v-model="item.count" />
          </td>
          <td class="td-money">${{ (item.price * item.count).toFixed(2) }}</td>
          <td class="td-del" @click="cart.removeFromCart(item)">×</td>
        </tr>
        <tr>
          <td class="td-title td-under" colspan="3">Итого</td>

          <td class="td-money td-under">${{ sumCart }}</td>
        </tr>
      </tbody>
    </table>

    <h3 v-else>Пока в ней пусто</h3>

    <div v-if="!isCheckout" class="buttons">
      <button v-if="sumCart > 0" @click="cart.clearCart()">
        Очистить корзину
      </button>
      <button v-if="sumCart > 0" @click="checkout">Оформить заказ</button>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.td-counter {
  text-align: end;
}

.td-under {
  border-top: 1px solid rgb(55, 133, 107);
}

.htext {
  font-weight: bold;
}

table {
  min-width: 900px;
}

td {
  padding: 4px;
}

.td-money {
  text-align: end;
}

.td-title {
  text-align: start;
}

.counter {
  width: 60px;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.td-del {
  padding: auto;
  cursor: pointer;
}
</style>
