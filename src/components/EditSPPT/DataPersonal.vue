<template>
  <h3>Data Personal</h3>
  <div class="row mt-4">
    <div class="col">
      <label class="form-label">NOP</label>
      <div class="input-group mb-3">
        <span class="input-group-text">35</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">05</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">150</span>
        <span class="mx-1">.</span>
        <span class="input-group-text">009</span>
        <span class="mx-1">.</span>
        <input class="form-control" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" maxlength="3" v-model="sendData.nop1" />
        <span class="mx-1">.</span>
        <input class="form-control" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" type="number" maxlength="4" v-model="sendData.nop2" />
        <span class="mx-1">.</span>
        <span class="input-group-text">0</span>
      </div>
    </div>
    <div class="col">
      <label class="form-label">Ketetapan</label>
      <div class="input-group mb-3">
        <input type="number" class="form-control" v-model="sendData.determnination" />
      </div>
    </div>
  </div>
  <div>
    <label class="form-label">Nama Wajib Pajak</label>
    <input type="text" class="form-control" v-model="sendData.taxPayerName" />
  </div>
  <div class="mt-3">
    <label class="form-label">Nama Keluarga</label>
    <div class="dropdown d-grid gap-2">
      <input class="form-control" list="listOptionsFamily" placeholder="Type to search..." v-model="sendData.family" />
      <datalist id="listOptionsFamily">
        <option v-for="family in families" :key="family.id">{{ family.id }} - {{ family.name }}</option>
      </datalist>
    </div>
  </div>
  <div class="mt-3">
    <label class="form-label">Nama Pamong</label>
    <div class="dropdown d-grid gap-2">
      <input class="form-control" list="listOptionsGuardian" placeholder="Type to search..." v-model="sendData.guardian" />
      <datalist id="listOptionsGuardian">
        <option v-for="guardian in guardian" :key="guardian.id">{{ guardian.id }} - {{ guardian.name }}</option>
      </datalist>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      families: null,
      guardian: null,
      sendData: {
        nop1: "",
        nop2: "",
        determnination: "",
        taxPayerName: "",
        family: "",
        guardian: "",
      },
    };
  },
  mounted: function() {
    axios
      .get("api/v1/families", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.families = response.data.data;
      });
    axios
      .get("api/v1/guardians", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.guardian = response.data.data;
      });
    let data = JSON.parse(sessionStorage.getItem("data"));
    let nop = data.tax_object.nop;
    this.sendData.nop1 = nop.substr(10, 3);
    this.sendData.nop2 = nop.substr(13, 4);
    this.sendData.determnination = data.tax_object.determination;
    this.sendData.taxPayerName = data.taxpayer.name;
    this.sendData.family = data.taxpayer.family.id + " - " + data.taxpayer.family.name;
    axios
      .get("api/v1/guardian/" + data.tax_object.guardian_id, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.sendData.guardian = response.data.data.id + " - " + response.data.data.name;
      });
  },
  updated: function() {
    this.$nextTick(function() {
      let regex = /\d+/g;
      sessionStorage.setItem("nop", 3505 + this.sendData.nop1 + this.sendData.nop2 + this.sendData.nop3 + this.sendData.nop4 + 0);
      sessionStorage.setItem("blockNumber", this.sendData.nop3 + this.sendData.nop4);
      sessionStorage.setItem("determination", this.sendData.determnination);
      sessionStorage.setItem("taxPayerName", this.sendData.taxPayerName);
      sessionStorage.setItem("family", this.sendData.family.match(regex));
      sessionStorage.setItem("guardianID", this.sendData.guardian.match(regex));
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
option {
  border-radius: 10px !important;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
</style>
