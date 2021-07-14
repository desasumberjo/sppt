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
        <td @click="detail(result.tax_object.nop)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.taxpayer.name }}</td>
        <td @click="detail(result.tax_object.nop)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.nop }}</td>
        <td @click="detail(result.tax_object.nop)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.guardian_id }}</td>
        <td @click="detail(result.tax_object.nop)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.land_area }} m<sup>2</sup></td>
        <td @click="detail(result.tax_object.nop)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.building_area }} m<sup>2</sup></td>
      </tr>
    </tbody>
  </table>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Detail</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Nama : {{ modalData.name }}</p>
          <p>NOP : {{ modalData.nop }}</p>
          <p>Jalan : {{ modalData.road }}</p>
          <p>Desa : {{ modalData.village }}</p>
          <p>RT / RW : {{ modalData.rt }} / {{ modalData.rw }}</p>
          <p>Keluarga : {{ modalData.family }}</p>
          <p>Luas Lahan : {{ modalData.landArea }} m<sup>2</sup></p>
          <p>Luas Bangunan : {{ modalData.buildingArea }} m<sup>2</sup></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["resultData"],
  data() {
    return {
      modalData: {
        name: "",
        nop: "",
        road: "",
        village: "",
        rt: "",
        rw: "",
        family: "",
        landArea: "",
        buildingArea: "",
      },
    };
  },
  methods: {
    detail(id) {
      this.id = id;
      axios.get("api/v1/sppt/" + this.id).then((response) => {
        this.modalData.name = response.data.data.taxpayer.name;
        this.modalData.nop = response.data.data.tax_object.nop;
        this.modalData.road = response.data.data.taxpayer.address.road;
        this.modalData.village = response.data.data.taxpayer.address.village;
        this.modalData.rt = response.data.data.taxpayer.address.rt;
        this.modalData.rw = response.data.data.taxpayer.address.rw;
        this.modalData.family = response.data.data.taxpayer.family.name;
        this.modalData.landArea = response.data.data.tax_object.land_area;
        this.modalData.buildingArea = response.data.data.tax_object.building_area;
      });
    },
  },
};
</script>
