<template>
  <table class="table table-hover">
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
      <tr @click="detail(result.tax_object.nop)" v-for="result in resultData" :key="result.id" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <td>{{ result.taxpayer.name }}</td>
        <td>{{ result.tax_object.nop }}</td>
        <td class="text-center">{{ result.tax_object.guardian_id }}</td>
        <td class="text-center">{{ result.tax_object.land_area }} m<sup>2</sup></td>
        <td class="text-center">{{ result.tax_object.building_area }} m<sup>2</sup></td>
        <td>
          <svg @click="edit(result)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
          <span>&nbsp;&nbsp;</span>
          <svg @click="handlerTax(result.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          <span>&nbsp;&nbsp;</span>
          <svg @click="deleteData(result.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </td>
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
      hasilPencarian: null,
      id: "",
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
    edit(result) {
      sessionStorage.setItem("data", JSON.stringify(result));
      this.$router.push({ name: "EditSPPT" });
    },
    handlerTax(id) {
      sessionStorage.setItem("spptID", id);
      this.$router.push({ name: "Tax" });
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
  cursor: pointer;
}
svg {
  cursor: pointer;
}
</style>
