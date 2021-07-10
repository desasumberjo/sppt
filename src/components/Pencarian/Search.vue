<template>
  <!-- ?? Dibuat FORM ?? -->
  <div class="input-group mb-3">
    <span class="input-group-text">35</span>
    <span class="mx-1">.</span>
    <span class="input-group-text">05</span>
    <span class="mx-1">.</span>
    <input v-on:keyup.enter="handleSearch" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" maxlength="3" v-model="number1" class="form-control" />
    <span class="mx-1">.</span>
    <input v-on:keyup.enter="handleSearch" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="3" type="number" v-model="number2" class="form-control" />
    <span class="mx-1">.</span>
    <input v-on:keyup.enter="handleSearch" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="3" type="number" v-model="number3" class="form-control" />
    <span class="mx-1">.</span>
    <input v-on:keyup.enter="handleSearch" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="4" type="number" v-model="number4" class="form-control" />
    <span class="mx-1">.</span>
    <span class="input-group-text">0</span>
    <!-- ?? Button type Submit ?? -->
    <button type="submit" @click="handleSearch" class="btn btn-primary mx-1 btn-sm ms-3" :disabled="isLoading">
      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span v-if="!isLoading">Cari</span>
    </button>
  </div>
  <div class="alert alert-danger" v-if="alert" role="alert">
    Data Tidak Ditemukan!
  </div>
  <h3 class="py-3">Hasil Pencarian</h3>
  <Table :resultData="result" />
</template>

<script>
import axios from "axios";
import Table from "./Table.vue";
export default {
  components: { Table },
  data() {
    return {
      number1: "",
      number2: "",
      number3: "",
      number4: "",
      result: "",
      nop: "",
      isLoading: false,
      alert: false,
    };
  },
  methods: {
    handleSearch() {
      this.isLoading = true;
      this.nop = 3505 + this.number1 + this.number2 + this.number3 + this.number4 + 0;
      axios
        .get("api/v1/sppt/search/" + this.nop, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.result = response.data.data;
          this.isLoading = false;
          this.alert = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.alert = true;
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
.input-group-text {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  border-radius: 10px !important;
}
.btn {
  border-radius: 18px;
}
</style>
