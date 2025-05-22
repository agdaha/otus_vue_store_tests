import { createApp } from "vue";
import "./assets/sass/style.scss";

import { createPinia } from "pinia";
import router from "./router/router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";

const options = {};
const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(Toast, options);
app.use(router);
app.mount("#app");

