<template>
  <!-- ?? Dibuat FORM ?? -->
    <div class="input-group mb-3">
      <span class="input-group-text">35</span>
      <span class="mx-1">.</span>
      <span class="input-group-text">05</span>
      <span class="mx-1">.</span>
      <input v-on:keyup.enter="search" type="text" v-model="number1" class="form-control" >
      <span class="mx-1">.</span>
      <input v-on:keyup.enter="search" type="text" v-model="number2" class="form-control">
      <span class="mx-1">.</span>
      <input v-on:keyup.enter="search" type="text" v-model="number3" class="form-control">
      <span class="mx-1">.</span>
      <input v-on:keyup.enter="search" type="text" v-model="number4" class="form-control">
      <span class="mx-1">.</span>
      <span class="input-group-text">0</span>
      <!-- ?? Button type Submit ?? -->
      <button @click="search" type="button" class="btn btn-primary mx-1 btn-sm ms-3">Cari</button>
    </div>
    <h2 class="py-5">Hasil Pencarian</h2>
    <Table :resultData="result"/>
</template>

<script>
import axios from 'axios'
import Table from './Table.vue'
export default {
  components: {Table},
  data(){
    return{
      number1: "",
      number2: "",
      number3: "",
      number4: "",
      result: "",
      nop: ""
    }
  },
  methods: {
    search: function (){
      this.nop = 3505 + this.number1 + this.number2 + this.number3 + this.number4 + 0
      axios.get('https://spptdesasumberjo.herokuapp.com/api/v1/sppt/search/' + this.nop,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then((response) => {
          this.result = response.data.data
        })
    }
  },
}
</script>