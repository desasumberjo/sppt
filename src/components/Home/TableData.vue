<template>
  <table class="table">
    <thead class="table-secondary">
      <tr>
        <th>Nama</th>
        <th>NOP</th>
        <th>ID Pamong</th>
        <th>Luas Lahan</th>
        <th>Luas Bangunan</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in resultData" :key="result.id">
        <td>{{ result.taxpayer.name }}</td>
        <td>{{ result.tax_object.nop }}</td>
        <td>{{ result.tax_object.guardian_id }}</td>
        <td>{{ result.tax_object.land_area }} m<sup>2</sup></td>
        <td>{{ result.tax_object.building_area }} m<sup>2</sup></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["resultData"],
};
</script>
