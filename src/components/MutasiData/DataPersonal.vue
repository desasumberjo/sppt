<template>
  <h2>Data Personal</h2>
  <div class="row mt-4">
    <div class="col">
      <label class="form-label">NOP</label>
      <div class="input-group mb-3">
        <span class="input-group-text">35</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">05</span>
        <span class="mx-1">.</span>
        <input type="number" class="form-control" maxlength="5" v-model="sendData.nop1">
        <span class="mx-1">.</span>
        <input type="number" class="form-control" v-model="sendData.nop2">
        <span class="mx-1">.</span>
        <input type="number" class="form-control" v-model="sendData.nop3">
        <span class="mx-1">.</span>
        <input type="number" class="form-control" v-model="sendData.nop4">
        <span class="mx-1">.</span>
        <span class="input-group-text">0</span>
      </div>
    </div>
    <div class="col">
      <div class="row">
        <div class="col">
          <label class="form-label">Nomor Blok</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.blockNumber1">
            <input type="number" class="ms-3 form-control" v-model="sendData.blockNumber2">
          </div>
        </div>
        <div class="col">
          <label class="form-label">Ketetapan</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.determnination">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <label class="form-label">Nama Wajib Pajak</label>
    <input type="text" class="form-control" v-model="sendData.taxPayerName">
  </div>
  <div class="mt-3">
    <label class="form-label">Nama Keluarga</label>
    <div class="dropdown d-grid gap-2">
      <select class="form-select" aria-label="Default select example" v-model="sendData.familyID">
        <option v-for="family in families" :key="family.id">{{family.id}} - {{family.name}}</option>
      </select>
    </div>
  </div>
  <div class="mt-3">
    <label class="form-label">Nama Pamong</label>
    <div class="dropdown d-grid gap-2">
      <select class="form-select" aria-label="Default select example" v-model="sendData.guardianID">
        <option v-for="guardian in guardian" :key="guardian.id">{{guardian.id}} - {{guardian.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      families: null,
      guardian: null, 
      sendData:{
        nop1: '',
        nop2: '',
        nop3: '',
        nop4: '',
        blockNumber1:'',
        blockNumber2:'',
        determnination: '',
        taxPayerName: '',
        familyID: '',
        selectedFamilyID: this.familyID,
        guardianID: '',
      },
    }
  },
  mounted: function(){
    axios.get('https://spptdesasumberjo.herokuapp.com/api/v1/families',
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then((response) => {
          this.families = response.data.data
        })
    axios.get('https://spptdesasumberjo.herokuapp.com/api/v1/guardians',
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then((response) => {
          this.guardian = response.data.data
        })
  },
  updated: function() {
    this.$nextTick(function () {
      let regex = /\d+/g;
      sessionStorage.setItem("nop", 3505 + this.sendData.nop1 + this.sendData.nop2 + this.sendData.nop3 + this.sendData.nop4 + 0);
      sessionStorage.setItem("blockNumber", this.sendData.blockNumber1 + '.' + this.sendData.blockNumber2);
      sessionStorage.setItem("determination", this.sendData.determnination);
      sessionStorage.setItem("taxPayerName", this.sendData.taxPayerName);
      sessionStorage.setItem("familyId", this.sendData.familyID.match(regex));
      sessionStorage.setItem("guardianID", this.sendData.guardianID.match(regex));
    })
  },
}
</script>