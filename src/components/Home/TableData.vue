<template>
  <table class="table table-hover">
    <thead class="table-secondary">
      <tr>
        <th>Nama</th>
        <th>NOP</th>
        <th>ID Pamong</th>
        <th>Luas Lahan</th>
        <th>Luas Bangunan</th>
        <th>Ketetapan</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in resultData" :key="result.id">
        <td @click="detail(result)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.taxpayer.name }}</td>
        <td @click="detail(result)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.nop }}</td>
        <td @click="detail(result)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.guardian_id }}</td>
        <td @click="detail(result)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.land_area }} m<sup>2</sup></td>
        <td @click="detail(result)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.tax_object.building_area }} m<sup>2</sup></td>
        <td @click="detail(result)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.current_tax_amount }}</td>
      </tr>
      <tr>
        <td class="text-center" style="font-weight: bold !important;" colspan="5">Total Pajak</td>
        <td>Rp. {{ totalTax }}</td>
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
          <h3>Info Pajak</h3>
          <table class="table">
            <thead class="table-secondary">
              <tr>
                <th>Jumlah</th>
                <th>Tahun</th>
                <th>Status Pembayaran</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="taxHistory in modalData.taxHistories" :key="taxHistory.id">
                <td>{{ taxHistory.amount }}</td>
                <td>{{ taxHistory.year }}</td>
                <td>{{ taxHistory.payment_status }}</td>
              </tr>
            </tbody>
          </table>
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
      totalTax: 0,
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
        taxHistories: "",
      },
    };
  },
  methods: {
    detail(result) {
      this.modalData.taxHistories = "";
      let sppt = result.tax_object.nop;
      let id = result.id;
      axios.get("api/v1/sppt/" + sppt).then((response) => {
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
      axios.get("api/v1/sppt/tax-histories/" + id).then((response) => {
        this.modalData.taxHistories = response.data.data.tax_histories;
      });
    },
  },
  mounted: function() {
    for (let i = 0; i < this.resultData.length; i++) {
      this.totalTax += this.resultData[i].current_tax_amount;
    }
  },
};
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
