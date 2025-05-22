<script setup>
  import { useForm } from "vee-validate";
  import * as yup from "yup";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import { userStore } from "../stories/user";

  const router = useRouter();
  const toast = useToast();
  const user = userStore();

  const { values, resetForm, meta, setValues, errors, defineField } = useForm({
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Обязательное поле")
        .min(4, "не менее 4 символов")
        .max(20, "не более 20 символов"),
      password: yup
        .string()
        .required("Обязательное поле")
        .min(6, "Пароль слишком короткий - должно быть не менее 6 символов.")
        .matches(/[a-zA-Z0-9^_!@#$%^&*()]/, "Password format."),
    }),
  });

  const [username, usernameAttrs] = defineField("username");
  const [password, passwordAttrs] = defineField("password");

  const login = () => {
    user.login(values).then(
      () => {
        toast.success(`${user.userName}, приветствуем Вас!`);
        router.push({ name: "newProduct" });
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      }
    );
  };
</script>

<template>
  <div class="login-view">
    <h1>LOGIN</h1>

    <div class="login">
      <label for="username">Username</label>
      <input
        type="text"
        placeholder="Username"
        v-model="username"
        v-bind="usernameAttrs"
      />
      <span class="error">{{ errors.username }}</span>
    </div>
    <div class="password">
      <label for="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        v-bind="passwordAttrs"
      />
      <span class="error">{{ errors.password }}</span>
    </div>
    <button :disabled="!meta.valid" @click="login">Login</button>
    <p class="help">
      <b>example</b>: username: "mor_2314", password: "83r5^_" (сервис немного
      притормаживает)
    </p>
  </div>
</template>

<style>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.login,
.password {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.error {
  color: red;
}

.help {
  width: 300px;
}
</style>
