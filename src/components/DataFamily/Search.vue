<template>
  <!-- ?? Dibuat FORM ?? -->
    <div class="input-group mb-3">
      <input v-on:keyup.enter="search" placeholder="Nama Keluarga" type="text" v-model="familyName" class="form-control" >
      <button @click="search" type="button" class="btn btn-primary mx-1 btn-sm ms-3">Cari</button>
    </div>
    <div class="col d-flex justify-content-between my-4">
      <h2>Data Keluarga</h2>
      <button @click="addFamily" class="btn btn-primary">
        Tambah Keluarga
      </button>
    </div>
    <Table :resultData="result"/>
</template>

<script>
import axios from 'axios'
import Table from './Table.vue'
export default {
  components: {Table},
  data(){
    return{
      familyName: "",
      result: "",
    }
  },
  methods: {
    search(){
      axios.get('https://spptdesasumberjo.herokuapp.com/api/v1/family/name/' + this.familyName.toUpperCase(),
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then((response) => {
          this.result = response.data.data
        })
        .catch(() => {
          window.alert('Data tidak Ditemukan')
        })
    },
    addFamily(){
      this.$router.push({ name: "AddFamily" });
    }
  },
}
</script>