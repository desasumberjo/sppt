<template>
  <div class="container-fluid">
    <h3>Edit Keluarga</h3>
    <div class="row mt-4">
      <div class="col-12">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="editFamily" v-model="name" type="text" class="form-control" />
      </div>
      <div class="col-6 my-3">
        <label class="form-label">Jalan</label>
        <input v-on:keyup.enter="editFamily" v-model="road" type="text" class="form-control" />
      </div>
      <div class="col-6 my-3">
        <label class="form-label">Kelurahan</label>
        <input v-on:keyup.enter="editFamily" v-model="village" type="text" class="form-control" />
      </div>
      <div class="col-6 my-3">
        <label class="form-label">RT</label>
        <input v-on:keyup.enter="editFamily" v-model="rt" type="number" class="form-control" />
      </div>
      <div class="col-6 my-3">
        <label class="form-label">RW</label>
        <input v-on:keyup.enter="editFamily" v-model="rw" type="number" class="form-control" />
      </div>
    </div>
    <div class="alert alert-danger" role="alert" v-if="isError">
      Masukkan Data yang Valid!
    </div>

    <div class="d-flex justify-content-end mt-4">
      <button @click="editFamily" class="btn btn-primary" :disabled="isLoading"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-if="!isLoading">Kirim</span></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      isError: false,
      name: "",
      road: "",
      village: "",
      rt: "",
      rw: "",
    };
  },
  methods: {
    editFamily() {
      this.isLoading = true;
      axios
        .patch(
          "api/v1/family/" + sessionStorage.getItem("idFamily"),
          {
            id: sessionStorage.getItem("idFamily"),
            name: this.name,
            rt: this.rt,
            rw: this.rw,
            village: this.village,
            road: this.road,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.isLoading = false;
          this.result = response.data.data;
          sessionStorage.removeItem("idFamily");
          this.$router.push({ name: "DataFamily" });
        })
        .catch(() => {
          this.isError = true;
        });
    },
  },
  mounted: function() {
    axios
      .get("api/v1/family/" + sessionStorage.getItem("idFamily"), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.name = response.data.data.name;
        this.road = response.data.data.road;
        this.village = response.data.data.village;
        this.rt = response.data.data.rt;
        this.rw = response.data.data.rw;
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
</style>
