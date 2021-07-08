<template>
  <div id="container-login" class="d-flex align-items-center justify-content-center">
    <div id="wrap-login" class="d-flex align-items-center justify-content-center border rounded p-5 d-flex justify-content-around" style="background-color: #fff !important">
      <img src="../assets/logo-kab-blitar.jpg" id="gambar" alt="logo" />
      <form @submit="handleSubmit">
        <h3 class="d-flex justify-content-center">Member Login</h3>
        <div class="mt-4 mb-3">
          <label for="exampleFormControlInput1" class="form-label">Nama Pengguna</label>
          <input v-on:keyup.enter="submit" type="text" class="form-control" placeholder="namapengguna" v-model="username" required />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input v-on:keyup.enter="submit" type="password" class="form-control" placeholder="************" v-model="password" required />
        </div>
        <div class="d-grid gap-2">
          <button @click="submit" class="btn btn-primary" type="submit" :disabled="isLoading"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Masuk</button>
        </div>
      </form>
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
      isLoading: false,
    };
  },
  methods: {
    handleSubmit(e) {
      this.isLoading = true;
      e.preventDefault();
      axios.get("sanctum/csrf-cookie").then(() => {
        axios
          .post("api/v1/login", {
            username: this.username,
            password: this.password,
          })
          .then((response) => {
            this.isLoading = false;
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
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
h3 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
input {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
label {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}
#gambar {
  display: inline-block;
  height: 29%;
  width: 29%;
}
#container-login {
  /* position: relative; */
  height: 100vh;
  background-color: #b0bec5 !important;
  /* do */
}
#wrap-login {
  border-radius: 30px !important;
}
</style>
