<template>
  <h3 class="mt-4">Target Mutasi</h3>
  <div class="row mt-4">
    <div class="col-6">
      <label class="form-label">No Persil SPPT</label>
      <div class="input-group mb-3">
        <span class="input-group-text">35</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">05</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">150</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">009</span>
        <span class="mx-1">.</span>
        <input type="text" class="form-control" v-model="nop.nop1" />
        <span class="mx-1">.</span>
        <input type="text" class="form-control" v-model="nop.nop2" />
        <span class="mx-1">.</span>
        <span class="input-group-text">0</span>
      </div>
    </div>
    <div class="col-3">
      <label class="form-label">Luas Bumi</label>
      <div class="input-group mb-3">
        <input type="number" class="form-control" v-model="landArea" disabled />
      </div>
    </div>
    <div class="col-3">
      <label class="form-label">Luas Bangunan</label>
      <div class="input-group mb-3">
        <input type="number" class="form-control" v-model="buildingArea" disabled />
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <label class="form-label">Nama Wajib Pajak</label>
    <div class="input-group mb-3">
      <input type="text" class="form-control" v-model="taxPayerName" disabled />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nop: {
        nop1: "",
        nop2: "",
      },
      tes: "tes",
      taxPayerName: "",
      landArea: "",
      buildingArea: "",
    };
  },
  updated: function() {
    this.$nextTick(function() {
      let finalNOP = 3505150009 + this.nop.nop1 + this.nop.nop2 + 0;
      if (finalNOP > 111111111111111110) {
        axios
          .get("api/v1/sppt/" + finalNOP, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            this.taxPayerName = response.data.data.taxpayer.name;
            this.landArea = response.data.data.tax_object.land_area;
            this.buildingArea = response.data.data.tax_object.building_area;
            sessionStorage.setItem("nopTarget", 3505150009 + this.nop.nop1 + this.nop.nop2 + 0);
          });
      }
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
h3 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
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
label {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
</style>
