<template>
  <div class="container-fluid">
    <h3>Tambah Pamong</h3>
    <div class="row mt-4">
      <div class="col-12">
        <label class="form-label">ID</label>
        <input v-on:keyup.enter="sendGuardian" v-model="id" type="number" class="form-control" />
      </div>
      <div class="col-12 my-3">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="sendGuardian" v-model="name" type="text" class="form-control" />
        <div class="alert alert-danger mt-4" role="alert" v-if="isError">
          Data yang anda masukkan Belum Lengkap
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-1">
      <button @click="previous" class="btn btn-primary">Kembali</button>
      <button @click="sendGuardian" class="btn btn-primary">Kirim</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      name: "",
      isError: false,
    };
  },
  methods: {
    previous() {
      this.$router.push({ name: "DataGuardian" });
    },
    sendGuardian() {
      axios
        .post(
          "api/v1/guardian",
          {
            id: this.id,
            name: this.name,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          this.$router.push({ name: "DataGuardian" });
        })
        .catch(() => {
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
input {
  border-radius: 10px !important;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
</style>
