<template>
  <div class="container-fluid">
    <h2>Edit Pamong</h2>
    <div class="row mt-4">
      <div class="col-12">
        <label class="form-label">ID</label>
        <input v-on:keyup.enter="editGuardian" v-model="id" type="number" class="form-control" />
      </div>
      <div class="col-12 my-3">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="editGuardian" v-model="name" type="text" class="form-control" />
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4">
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
    };
  },
  methods: {
    previous() {
      this.$router.push({ name: "DataGuardian" });
    },
    sendGuardian() {
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
          this.$router.push({ name: "DataGuardian" });
          sessionStorage.removeItem("IDGuardian");
        });
    },
  },
};
</script>
