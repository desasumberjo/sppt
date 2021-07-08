<template>
  <div class="container border rounded p-5" id="container-login">
    <div>
      <h1>Login</h1>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Nama Pengguna</label>
        <input v-on:keyup.enter="submit" type="text" class="form-control" id="exampleFormControlInput1" placeholder="namapengguna" v-model="username" />
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input v-on:keyup.enter="submit" type="password" class="form-control" id="inputPassword" placeholder="************" v-model="password" />
      </div>
      <div class="d-grid gap-2">
        <button @click="submit" class="btn btn-primary" type="button">Masuk</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submit() {
      axios.get("sanctum/csrf-cookie").then(() => {
        axios
          .post("api/v1/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            sessionStorage.setItem("token", response.data.data.access_token);
            sessionStorage.setItem("role", response.data.data.user.role);
            this.$router.push({ name: "Pencarian" });
          });
      });
    },
  },
};
</script>

<style scoped>
#container-login {
  /* position: relative; */
  margin-top: 7.5em;
  /* do */
}
</style>
