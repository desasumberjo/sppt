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
        <td>123456789</td>
        <td class="text-center">7</td>
        <td class="text-center">1000 m<sup>2</sup></td>
        <td class="text-center">1000 m<sup>2</sup></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["resultData"],
};
</script>
