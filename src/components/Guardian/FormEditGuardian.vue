<template>
  <div class="container-fluid">
    <h2>Edit Pamong</h2>
    <div class="row mt-4">
      <div class="col-12">
        <label class="form-label">ID</label>
        <input v-on:keyup.enter="sendGuardian" v-model="id" type="number" class="form-control" />
      </div>
      <div class="col-12 my-3">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="sendGuardian" v-model="name" type="text" class="form-control" />
      </div>
    </div>
    <div class="alert alert-danger" v-if="alert" role="alert">
      Masukkan Data yang Valid!
    </div>

    <div class="d-flex justify-content-between mt-4">
      <button @click="previous" class="btn btn-primary">Kembali</button>
      <button @click="sendGuardian" class="btn btn-primary" :disabled="isLoading"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-if="!isLoading">Kirim</span></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      alert: false,
      isLoading: false,
      id: "",
      name: "",
    };
  },
  mounted: function() {
    axios
      .get("api/v1/guardian/" + sessionStorage.getItem("IDGuardian"), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.id = response.data.data.id;
        this.name = response.data.data.name;
      });
  },
  methods: {
    previous() {
      this.$router.push({ name: "DataGuardian" });
    },
    sendGuardian() {
      this.isLoading = true;
      axios
        .put(
          "api/v1/guardian/" + sessionStorage.getItem("IDGuardian"),
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
          this.isLoading = false;
          this.$router.push({ name: "DataGuardian" });
          sessionStorage.removeItem("IDGuardian");
        })
        .catch(() => {
          this.isLoading = false;
          this.alert = true;
        });
    },
  },
};
</script>
