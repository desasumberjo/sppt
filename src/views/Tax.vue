<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <h2>Data Pajak</h2>
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
  name: "TambahAdmin",
};
</script>
