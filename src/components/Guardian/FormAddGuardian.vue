<template>
  <div class="container-fluid">
    <h2>Tambah Pamong</h2>
    <div class="row mt-4">
      <div class="col-12">
        <label class="form-label">ID</label>
        <input v-on:keyup.enter="sendGuardian" v-model="id" type="number" class="form-control">
      </div>
      <div class="col-12 my-3">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="sendGuardian" v-model="name" type="text" class="form-control">
        <div class="alert alert-danger mt-4" role="alert" v-if="isError">
          Data yang anda masukkan Belum Lengkap
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-1">
      <button @click="previous" class="btn btn-primary">Kembali</button>
      <button @click="sendGuardian" class="btn btn-primary">Kirim</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      id: '',
      name: '',
      isError: false
    }
  },
  methods: {
    previous(){
      this.$router.push({ name: "DataGuardian" });
    },
    sendGuardian(){
      axios.post('https://spptdesasumberjo.herokuapp.com/api/v1/guardian',
        {
          id: this.id,
          name: this.name
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then(() => {
          this.$router.push({ name: "DataGuardian" });
        })
        .catch(() => {
          this.isError = true
        })
    }
  }
}
</script>