<template>
  <table class="table">
    <thead class="table-secondary">
      <tr>
        <th>Nama</th>
        <th>NOP</th>
        <th>Luas Lahan</th>
        <th>Luas Bangunan</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results" :key="result.id">
        <td>{{ result.taxpayer.name }}</td>
        <td>{{ result.tax_object.nop }}</td>
        <td>{{ result.tax_object.land_area }} m<sup>2</sup></td>
        <td>{{ result.tax_object.building_area }} m<sup>2</sup></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      results: "",
    };
  },
  mounted: function() {
    axios.get("/api/v1/sppts").then((response) => {
      console.log(response.data.data.data);
      this.results = response.data.data.data;
    });
  },
};
</script>
