<template>
  <div class="container-fluid">
    <h2>Tambah Keluarga</h2>
    <div class="row mt-4">
      <div class="col-12">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="sendFamily" v-model="name" type="text" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">Jalan</label>
        <input v-on:keyup.enter="sendFamily" v-model="road" type="text" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">Kelurahan</label>
        <input v-on:keyup.enter="sendFamily" v-model="village" type="text" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">RT</label>
        <input v-on:keyup.enter="sendFamily" v-model="rt" type="number" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">RW</label>
        <input v-on:keyup.enter="sendFamily" v-model="rw" type="number" class="form-control">
      </div>
      <div class="alert alert-danger" role="alert" v-if="isError">
        Data yang anda masukkan Belum Lengkap
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4">
      <button @click="previous" class="btn btn-primary">Kembali</button>
      <button @click="sendFamily" class="btn btn-primary">Kirim</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      name: '',
      road: '',
      village: '',
      rt: '',
      rw: '',
      isError: false
    }
  },
  methods: {
    sendFamily(){
      axios.post('https://spptdesasumberjo.herokuapp.com/api/v1/family',
        {
          name: this.name,
          rt: this.rt,
          rw: this.rw,
          village: this.village,
          road: this.road
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then((response) => {
          this.result = response.data.data
          this.$router.push({ name: "DataFamily" });
        })
        .catch(() => {
          this.isError = true
        })
    },
    previous(){
      this.$router.push({ name: "DataFamily" });
    }
  }
}
</script>