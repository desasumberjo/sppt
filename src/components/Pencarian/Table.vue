<template>
  <table class="table">
    <thead class="table-secondary">
      <tr>
        <th>Nama</th>
        <th>NOP</th>
        <th>ID Pamong</th>
        <th>Luas Lahan</th>
        <th>Luas Bangunan</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in resultData" :key="result.id">
        <!-- <td>Muhammad Iqbal Naufal Ilmi</td>
        <td>35.05.150.009.004.0038.0</td>
        <td>08</td> -->
        <!-- <td>{{result.taxpayer.taxpayer_name}}</td> -->
        <td>{{ result.taxpayer.name }}</td>
        <td>{{ result.tax_object.nop }}</td>
        <td>{{ result.tax_object.guardian_id }}</td>
        <td>{{ result.tax_object.land_area }} m<sup>2</sup></td>
        <td>{{ result.tax_object.building_area }} m<sup>2</sup></td>
        <td>
          <img @click="edit(result)" src="../../assets/Pencarian/pencil-square.svg" alt="" />
          <img @click="deleteData(result.id)" class="ms-2" src="../../assets/Pencarian/trash.svg" alt="" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  props: ["resultData"],
  data() {
    return {
      hasilPencarian: null,
    };
  },
  methods: {
    edit(result) {
      sessionStorage.setItem("data", JSON.stringify(result));
      this.$router.push({ name: "EditSPPT" });
    },
    deleteData(id) {
      axios
        .delete("api/v1/sppt/delete/" + id, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
th {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
td {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}
</style>
