import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import AuthService from "../services/auth.service";


export const userStore = defineStore("user", () => {
  const user = reactive({
    token: "",
    isAuth: false,
  });

  setValues();

  const isAuth = computed(() => {
    return user.isAuth;
  });

  function setValues() {
    const value = localStorage.getItem("user");
    if (value) {
      user.token = JSON.parse(value).token;
      user.isAuth = true;
    }
  }

  function login(user) {
    return AuthService.login(user).then(
      (data) => {
        setValues();
        return Promise.resolve(data);
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  function logOut() {
    user.isAuth = false;
    AuthService.logout();
  }

  const userName = computed(() => {
    if (user.token) {
      return getJwtPayload(user.token).user;
    }
    return "";
  });

  function getJwtPayload(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }

  return { login, logOut, isAuth, userName };
});
