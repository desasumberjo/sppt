<template>
  <div class="container-fluid">
    <h3>Tambah Admin</h3>
    <div class="row mt-4">
      <div class="col-6">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="submit" v-model="name" type="text" class="form-control" />
      </div>
      <div class="col-6">
        <label class="form-label">Jabatan</label>
        <input v-on:keyup.enter="submit" v-model="occupation" type="text" class="form-control" />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-6">
        <label class="form-label">Nama Pengguna</label>
        <input v-on:keyup.enter="submit" v-model="username" type="text" class="form-control" />
      </div>
      <div class="col-6">
        <label class="form-label">Surel</label>
        <input v-on:keyup.enter="submit" v-model="email" type="email" class="form-control" />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-6">
        <label class="form-label">Kata Sandi</label>
        <input v-on:keyup.enter="submit" v-model="password" type="password" class="form-control" />
      </div>
      <div class="col-6">
        <label class="form-label">Ulangi Kata Sandi</label>
        <input v-on:keyup.enter="submit" type="password" class="form-control" />
      </div>
    </div>
    <div class="alert alert-danger mt-4" role="alert" v-if="isError">
      Data yang anda masukkan Belum Lengkap
    </div>

    <div class="d-flex justify-content-end mt-4">
      <button @click="submit" class="btn btn-primary" :disabled="isLoading"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-if="!isLoading">Kirim</span></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      occupation: "",
      username: "",
      email: "",
      password: "",
      isError: false,
      isLoading: false,
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      axios
        .post(
          "api/v1/administrator",
          {
            name: this.name,
            occupation: this.occupation,
            username: this.username,
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.isLoading = false;
          this.result = response.data.data;
          this.$router.push({ name: "DataAdmin" });
        })
        .catch(() => {
          this.isLoading = false;
          this.isError = true;
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
label {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
input {
  border-radius: 10px !important;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
</style>
