<template>
  <div class="input-group">
    <span class="input-group-text">35</span>
    <span class="mx-1">.</span>
    <span class="input-group-text">05</span>
    <span class="mx-1">.</span>
    <span class="input-group-text">150</span>
    <span class="mx-1">.</span>
    <span class="input-group-text">009</span>
    <span class="mx-1">.</span>
    <input v-on:keyup.enter="handleSearch" type="number" class="form-control" v-model="nop1" />
    <span class="mx-1">.</span>
    <input v-on:keyup.enter="handleSearch" type="number" class="form-control" v-model="nop2" />
    <span class="mx-1">.</span>
    <span class="input-group-text">0</span>
    <button type="submit" @click="handleSearch" class="btn btn-primary mx-1 btn-sm ms-3" :disabled="isLoading">
      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span v-if="!isLoading">Cari</span>
    </button>
  </div>
  <div class="alert alert-danger mt-3" v-if="alert" role="alert">
    Data Tidak Ditemukan!
  </div>
  <div class="container-table p-3 mt-3">
    <TableDisplay v-if="tableDisplay" />
    <TableData :resultData="result" v-if="!tableDisplay" />
  </div>
</template>

<script>
import axios from "axios";
import TableDisplay from "./TableDisplay.vue";
import TableData from "./TableData.vue";
export default {
  name: "HomeSearch",
  components: { TableDisplay, TableData },
  data() {
    return {
      nop1: "",
      nop2: "",
      result: "",
      isLoading: false,
      tableDisplay: true,
      alert: false,
    };
  },
  methods: {
    handleSearch() {
      this.isLoading = true;
      axios
        .get("/api/v1/sppt/search/" + 3505150009 + this.nop1 + this.nop2 + 0)
        .then((response) => {
          this.tableDisplay = false;
          this.result = response.data.data;
          this.isLoading = false;
          this.alert = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.alert = true;
          this.tableDisplay = true;
        });
    },
  },
};
</script>

<style scoped>
input {
  border-radius: 10px !important;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
.input-group-text {
  border-radius: 10px !important;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
.container-table {
  border-radius: 20px;
  background-color: #fff !important;
}
</style>
