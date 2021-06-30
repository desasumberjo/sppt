<template>
  <!-- <div class="container-fluid"> -->
    <!-- <div class="row min-vh-100 flex-column flex-md-row"> -->
      <aside class="col-12 col-md-3 col-xl-2 p-0 flex-shrink-1" style="background-color: #5843BE !important">
        <nav class="navbar navbar-expand-md navbar-dark bd-dark flex-md-column
          flex-row align-items-center py-2 text-center sticky-top" id="sidebar">
          <div class="text-center p-3">
            <img src="../assets/profile.png" 
              alt="profile picture" class="img-fluid rounded-circle p-1 d-none
              d-md-block shadow">
          </div>
          <p class="navbar-brand mx-0 font-weight text-nowrap">
            <span class="fs-4">{{name}}</span>
            <br>
            <span class="fs-6 gray-600" style="color:#a1a1a1;">{{occupation}}</span>
          </p>
          <button class="navbar-toggler border-0 order-1" type="button" data-toggler="collapse" 
            data-target="#nav" arial-controls="#nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>  
          </button>
          <div class="collapse navbar-collapse prder-last" id="nav">
            <ul class="navbar-nav flex-column w-100 justify-content-center mt-2">
              <li class="nav-item">
                <router-link to="/pencarian" class="nav-link">Pencarian</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/tambah-data" class="nav-link mt-2">Tambah Data</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/mutasi-data-personal" class="nav-link mt-2">Mutasi Data</router-link>
              </li>
              <li v-if="superAdmin" class="nav-item">
                <router-link to="/data-admin" class="nav-link mt-2">Data Admin</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/data-family" class="nav-link mt-2">Data Keluarga</router-link>
              </li>
              <li v-if="superAdmin" class="nav-item">
                <router-link to="/data-pamong" class="nav-link mt-2">Data Pamong</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/pengaturan" class="nav-link mt-2">Pengaturan</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/" @click="logout" class="nav-link mt-2">Keluar</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      name: "",
      occupation: "",
      superAdmin: false
    }
  },
  methods:{
    logout(){
      axios.post('https://spptdesasumberjo.herokuapp.com/api/v1/logout', {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then(() => {
          sessionStorage.clear()
        })
    }
  },
  mounted: function(){
    if(sessionStorage.getItem("role") === 'super admin'){
      this.superAdmin = true
    }
    axios.get('https://spptdesasumberjo.herokuapp.com/api/v1/profile',
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })  
        .then((response) => {
          this.name = response.data.data.name
          this.occupation = response.data.data.occupation
        })
  }
}
</script>