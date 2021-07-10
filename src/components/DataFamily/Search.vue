<template>
  <!-- ?? Dibuat FORM ?? -->
  <div class="input-group mb-3">
    <input v-on:keyup.enter="search" placeholder="Nama Keluarga" type="text" v-model="familyName" class="form-control" />
    <button @click="search" type="button" class="btn btn-primary mx-1 btn-sm ms-3">Cari</button>
  </div>
  <div class="col d-flex justify-content-between my-4">
    <h3>Data Keluarga</h3>
    <button @click="addFamily" class="btn btn-primary">
      Tambah Keluarga
    </button>
  </div>
  <Table :resultData="result" />
</template>

<script>
import axios from "axios";
import Table from "./Table.vue";
export default {
  components: { Table },
  data() {
    return {
      familyName: "",
      result: "",
    };
  },
  methods: {
    search() {
      axios
        .get("api/v1/family/name/" + this.familyName.toUpperCase(), {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.result = response.data.data;
        })
        .catch(() => {
          window.alert("Data tidak Ditemukan");
        });
    },
    addFamily() {
      this.$router.push({ name: "AddFamily" });
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
.input-group-text {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  border-radius: 10px !important;
}
</style>
