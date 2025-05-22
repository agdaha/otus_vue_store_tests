<script setup>
  import CartIcon from "./components/CartIcon.vue";
  import { useRouter } from "vue-router";
  import { userStore } from "./stories/user";
  import { storeToRefs } from "pinia";

  const user = userStore();
  const {isAuth} = storeToRefs(user);

  const $router = useRouter();
  const showCart = () => {
    $router.push("/cart");
  };
  const logout = () => {
    user.logOut();
    $router.push("/");
  };
</script>

<template>
  <header>
    <router-link to="/">
      <div class="logo">
        <img
          alt="Store logo"
          src="./assets/img/logo.svg"
          width="48"
          height="48"
        />

        <h1>Online Store</h1>
      </div>
    </router-link>
    <div class="nav">
      <ul class="menu-list">
        <li class="menu-item"><router-link to="/">Главная</router-link></li>
        <li class="menu-item"><router-link to="/cart">Корзина</router-link></li>
        <li v-if="!isAuth" class="menu-item">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="isAuth" class="menu-item" @click="logout">
          <a href="#">LogOut</a>
        </li>
      </ul>
      <cart-icon @onclick="showCart()" />
    </div>
  </header>
  <router-view></router-view>

  <footer></footer>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  will-change: filter;
  transition: filter 300ms;
  gap: 10px;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

header {
  width: 100%;
  display: flex;
  justify-items: start;
  text-align: start;
  align-items: center;
}

.nav {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 60px;
  justify-content: space-between;
}

.menu-list {
  display: flex;
  gap: 90px;
}

.menu-item {
  list-style: none;
  font-size: large;
  font-weight: 700;
}

.router-link-active {
  color: #646cffaa;
}

.router-link-exact-active {
  color: brown;
}
</style>
