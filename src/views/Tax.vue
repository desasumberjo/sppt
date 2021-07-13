<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <div class="d-flex justify-content-between pb-2">
            <h2>Data Pajak</h2>
            <button @click="addTax" class="btn btn-primary">Tambah Data</button>
          </div>
          <Table />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Table from "../components/Tax/Table.vue";

export default {
  components: { Aside, Table },
  name: "Tax",
  methods: {
    addTax() {
      this.$router.push({ name: "AddTax" });
    },
  },
};
</script>
