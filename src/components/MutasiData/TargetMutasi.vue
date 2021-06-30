<template>
  <h2 class="mt-4">Target Mutasi</h2>
  <div class="row mt-4">
    <div class="col-6">
      <label class="form-label">No Persil SPPT</label>
      <div class="input-group mb-3">
        <span class="input-group-text">35</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">05</span>
        <span class="mx-1">.</span>
        <input type="text" class="form-control" v-model="nop.nop1">
        <span class="mx-1">.</span>
        <input type="text" class="form-control" v-model="nop.nop2">
        <span class="mx-1">.</span>
        <input type="text" class="form-control" v-model="nop.nop3">
        <span class="mx-1">.</span>
        <input type="text" class="form-control" v-model="nop.nop4">
        <span class="mx-1">.</span>
        <span class="input-group-text">0</span>
      </div>
    </div>
    <div class="col-3">
      <label class="form-label">Luas Bumi</label>
      <div class="input-group mb-3">
        <input type="number" class="form-control" v-model="landArea" disabled>
      </div>
    </div>
    <div class="col-3">
      <label class="form-label">Luas Bangunan</label>
      <div class="input-group mb-3">
        <input type="number" class="form-control" v-model="buildingArea" disabled>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <label class="form-label">Nama Wajib Pajak</label>
    <div class="input-group mb-3">
      <input type="text" class="form-control" v-model="taxPayerName" disabled>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      nop:{
        nop1: '',
        nop2: '',
        nop3: '',
        nop4: ''
      },
      tes: 'tes',
      taxPayerName: '',
      landArea: '',
      buildingArea: ''
    }
  },
  updated: function() {
    this.$nextTick(function () {
      let finalNOP = 3505 + this.nop.nop1 + this.nop.nop2 + this.nop.nop3 + this.nop.nop4 + 0
      if(finalNOP > 111111111111111110){
        axios.get('https://spptdesasumberjo.herokuapp.com/api/v1/sppt/' + finalNOP,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })  
          .then((response) => {
            this.taxPayerName = response.data.data.taxpayer.name
            this.landArea = response.data.data.tax_object.land_area
            this.buildingArea = response.data.data.tax_object.building_area
            sessionStorage.setItem("nopTarget", 3505 + this.nop.nop1 + this.nop.nop2 + this.nop.nop3 + this.nop.nop4 + 0);
          })
      }
    })
  },
}
</script>