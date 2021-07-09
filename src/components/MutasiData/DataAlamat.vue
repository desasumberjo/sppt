<template>
  <h3 class="mt-4">Alamat</h3>
  <div class="row mt-4">
    <div class="col">
      <div class="row">
        <div class="col-10">
          <label class="form-label">Jalan Wajib Pajak</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="sendData.taxPayerRoad" />
          </div>
        </div>
        <div class="col-2">
          <label class="form-label">RT</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.taxPayerRT" />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="row">
        <div class="col-2">
          <label class="form-label">RW</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.taxPayerRW" />
          </div>
        </div>
        <div class="col-10">
          <label class="form-label">Kelurahan Wajib Pajak</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="sendData.taxPayerVillage" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col">
      <div class="row">
        <div class="col-10">
          <label class="form-label">Jalan Objek Pajak</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="sendData.taxObjectRoad" />
          </div>
        </div>
        <div class="col-2">
          <label class="form-label">RT</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.taxObjectRT" />
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="row">
        <div class="col-2">
          <label class="form-label">RW</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.taxObjectRW" />
          </div>
        </div>
        <div class="col-10">
          <label class="form-label">Kelurahan Objek Pajak</label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" v-model="sendData.taxObjectVillage" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col">
      <label class="form-label">No Persil SPPT</label>
      <div class="input-group mb-3">
        <input type="number" class="form-control" v-model="sendData.spptPersilNumber" />
      </div>
    </div>
    <div class="col">
      <div class="row">
        <div class="col">
          <label class="form-label">Luas Bumi</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.landArea" />
          </div>
        </div>
        <div class="col">
          <label class="form-label">Luas Bangunan</label>
          <div class="input-group mb-3">
            <input type="number" class="form-control" v-model="sendData.buildingArea" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendData: {
        taxPayerRoad: "",
        taxPayerRT: "",
        taxPayerRW: "",
        taxPayerVillage: "",
        taxObjectRoad: "",
        taxObjectRT: "",
        taxObjectRW: "",
        taxObjectVillage: "",
        spptPersilNumber: "",
        landArea: "",
        buildingArea: "",
      },
    };
  },
  updated: function() {
    this.$nextTick(function() {
      sessionStorage.setItem("taxPayerRoad", this.sendData.taxPayerRoad);
      sessionStorage.setItem("taxPayerRT", this.sendData.taxPayerRT);
      sessionStorage.setItem("taxPayerRW", this.sendData.taxPayerRW);
      sessionStorage.setItem("taxPayerVillage", this.sendData.taxPayerVillage);
      sessionStorage.setItem("taxObjectRoad", this.sendData.taxObjectRoad);
      sessionStorage.setItem("taxObjectRT", this.sendData.taxObjectRT);
      sessionStorage.setItem("taxObjectRW", this.sendData.taxPayerRW);
      sessionStorage.setItem("taxObjectVillage", this.sendData.taxObjectVillage);
      sessionStorage.setItem("spptPersilNumber", this.sendData.spptPersilNumber);
      sessionStorage.setItem("landArea", this.sendData.landArea);
      sessionStorage.setItem("buildingArea", this.sendData.buildingArea);
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
.btn {
  border-radius: 18px;
}
</style>
