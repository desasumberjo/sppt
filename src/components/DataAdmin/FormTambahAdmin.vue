<template>
  <div class="container-fluid">
    <h2>Tambah Admin</h2>
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
      <button @click="submit" class="btn btn-primary">Kirim</button>
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
    };
  },
  methods: {
    submit() {
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
          this.result = response.data.data;
          this.$router.push({ name: "DataAdmin" });
        })
        .catch(() => {
          this.isError = true;
        });
    },
  },
};
</script>
