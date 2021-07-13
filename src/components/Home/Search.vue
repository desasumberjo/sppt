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
    <input type="number" class="form-control" />
    <span class="mx-1">.</span>
    <input type="number" class="form-control" />
    <span class="mx-1">.</span>
    <span class="input-group-text">0</span>
    <button type="submit" @click="handleSearch" class="btn btn-primary mx-1 btn-sm ms-3" :disabled="isLoading">
      <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span v-if="!isLoading">Cari</span>
    </button>
  </div>
  <div class="container-table p-3 mt-3">
    <TableDisplay v-if="tableDisplay" />
    <TableData v-if="!tableDisplay" />
  </div>
</template>

<script>
import TableDisplay from "./TableDisplay.vue";
import TableData from "./TableData.vue";
export default {
  name: "HomeSearch",
  components: { TableDisplay, TableData },
  data() {
    return {
      tableDisplay: true,
    };
  },
  methods: {
    handleSearch() {
      this.tableDisplay = false;
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
