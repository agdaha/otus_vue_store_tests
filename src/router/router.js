import { createWebHistory, createRouter } from "vue-router";
import Home from "../view/HomeView.vue";
import Cart from "../view/CartView.vue";
import Checkout from "../view/CheckoutView.vue";
import Login from "../view/LoginView.vue";
import Product from "../view/ProductView.vue";
import NewProduct from "../view/NewProductView.vue";
import { userStore } from "../stories/user";
// import NewProduct from "../view/NewProductView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/poduct/:productId",
    name: "product",
    component: Product,
  },
  {
    path: "/new_poduct",
    name: "newProduct",
    component: NewProduct,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const {isAuth} = userStore();
  if (to.name === "newProduct" && !isAuth) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
