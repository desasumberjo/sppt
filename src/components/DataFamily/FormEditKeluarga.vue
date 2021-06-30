<template>
  <div class="container-fluid">
    <h2>Edit Keluarga</h2>
    <div class="row mt-4">
      <div class="col-12">
        <label class="form-label">Nama</label>
        <input v-on:keyup.enter="editFamily" v-model="name" type="text" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">Jalan</label>
        <input v-on:keyup.enter="editFamily" v-model="road" type="text" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">Kelurahan</label>
        <input v-on:keyup.enter="editFamily" v-model="village" type="text" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">RT</label>
        <input v-on:keyup.enter="editFamily" v-model="rt" type="number" class="form-control">
      </div>
      <div class="col-6 my-3">
        <label class="form-label">RW</label>
        <input v-on:keyup.enter="editFamily" v-model="rw" type="number" class="form-control">
      </div>
    </div>

    <div class="d-flex justify-content-end mt-4">
      <button @click="editFamily" class="btn btn-primary">Kirim</button>
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
      rw: ''
    }
  },
  methods: {
    editFamily(){
      axios.patch('https://spptdesasumberjo.herokuapp.com/api/v1/family/' + sessionStorage.getItem("idFamily"),
        {
          id: sessionStorage.getItem("idFamily"),
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
          sessionStorage.removeItem("idFamily")
          this.$router.push({ name: "DataFamily" });
        })
    }
  }
}
</script>