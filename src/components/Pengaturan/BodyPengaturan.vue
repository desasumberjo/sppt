<template>
  <div class="row mt-4">
    <div class="col-6">
      <label class="form-label">Nama</label>
      <input v-on:keyup.enter="updateProfile" v-model="name" type="text" class="form-control">
    </div>
    <div class="col-6">
      <label class="form-label">Jabatan</label>
      <input v-on:keyup.enter="updateProfile" v-model="occupation" type="text" class="form-control">
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-6">
      <label class="form-label">Nama Pengguna</label>
      <input v-on:keyup.enter="updateProfile" v-model="username" type="text" class="form-control">
    </div>
    <div class="col-6">
      <label class="form-label">Surel</label>
      <input v-on:keyup.enter="updateProfile" v-model="email" type="email" class="form-control">
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-12">
      <label class="form-label">Kata Sandi Lama</label>
      <input v-on:keyup.enter="updateProfile" v-model="oldPassword" type="password" class="form-control">
    </div>
    <div class="col-12 mt-4">
      <label class="form-label">Kata Sandi Baru</label>
      <input v-on:keyup.enter="updateProfile" v-model="password" type="password" class="form-control">
      <div class="form-text">
        Password harus memiliki 8 karakter
      </div>
    </div>
    <div class="col-12 mt-4">
      <label class="form-label">Ulangi Kata Sandi</label>
      <input v-on:keyup.enter="updateProfile" v-model="confirmNewPassword" type="password" class="form-control">
      <div class="form-text">
        Password harus memiliki 8 karakter
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-end">
    <button @click="updateProfile" class="btn btn-primary mt-4 ">Simpan</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      name: "",
      occupation: "",
      username: "",
      email: "",
      oldPassword: "",
      password: "",
      confirmNewPassword: ""
    }
  },
  methods: {
    updateProfile(){
      if(this.password === this.confirmNewPassword){
        const fd = new FormData();
        fd.append("_method", "patch");
        fd.append("name", this.name);
        fd.append("occupation", this.occupation);
        fd.append("username", this.username);
        fd.append("email", this.email);
        fd.append("confirmation_password", this.oldPassword)
        fd.append("new_password", this.password)
        // fd.append("new_password", this.password);
        axios.post('https://spptdesasumberjo.herokuapp.com/api/v1/profile/update', fd,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })  
          .then(() => {
            location.reload();
          })
      }
    }
  }
}
</script>