<template>
  <div class="row mt-4">
    <div class="col-6">
      <label class="form-label">Nama</label>
      <input v-on:keyup.enter="updateProfile" v-model="name" type="text" class="form-control" />
    </div>
    <div class="col-6">
      <label class="form-label">Jabatan</label>
      <input v-on:keyup.enter="updateProfile" v-model="occupation" type="text" class="form-control" />
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-6">
      <label class="form-label">Nama Pengguna</label>
      <input v-on:keyup.enter="updateProfile" v-model="username" type="text" class="form-control" />
    </div>
    <div class="col-6">
      <label class="form-label">Surel</label>
      <input v-on:keyup.enter="updateProfile" v-model="email" type="email" class="form-control" />
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-12">
      <label class="form-label">Kata Sandi Lama</label>
      <input v-on:keyup.enter="updateProfile" v-model="oldPassword" type="password" class="form-control" />
    </div>
    <div class="col-12 mt-4">
      <label class="form-label">Kata Sandi Baru</label>
      <input v-on:keyup.enter="updateProfile" v-model="password" type="password" class="form-control" />
      <div class="form-text">
        Password harus memiliki 8 karakter
      </div>
    </div>
    <div class="col-12 mt-4">
      <label class="form-label">Ulangi Kata Sandi</label>
      <input v-on:keyup.enter="updateProfile" v-model="confirmNewPassword" type="password" class="form-control" />
      <div class="form-text" v-if="!alertPassword">
        Password harus memiliki 8 karakter
      </div>
      <div class="form-text" style="color: red" v-if="alertPassword">
        Password tidak Sesuai
      </div>
      <div class="alert alert-danger mt-4" role="alert" v-if="isError">
        Data yang anda masukkan Belum Lengkap
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-end">
    <button @click="updateProfile" class="btn btn-primary mt-2 " :disabled="isLoading"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-if="isLoading == false">Simpan</span></button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["profile"],
  data() {
    return {
      name: "",
      occupation: "",
      username: "",
      email: "",
      oldPassword: "",
      password: "",
      confirmNewPassword: "",
      isLoading: false,
      isError: false,
      alertPassword: false,
    };
  },
  methods: {
    updateProfile() {
      this.isLoading = true;
      if (this.password === this.confirmNewPassword) {
        const fd = new FormData();
        fd.append("_method", "patch");
        fd.append("name", this.name);
        fd.append("occupation", this.occupation);
        fd.append("username", this.username);
        fd.append("email", this.email);
        fd.append("confirmation_password", this.oldPassword);
        fd.append("new_password", this.password);
        // fd.append("new_password", this.password);
        axios
          .post("api/v1/profile/update", fd, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.isLoading = false;
            location.reload();
          })
          .catch(() => {
            this.isLoading = false;
            this.isError = true;
          });
      }
    },
  },
  mounted: function() {
    this.name = this.profile.name;
    this.occupation = this.profile.occupation;
    this.username = this.profile.username;
    this.email = this.profile.email;
  },
  updated: function() {
    this.$nextTick(function() {
      if (this.password !== this.confirmNewPassword) {
        this.alertPassword = true;
      } else {
        this.alertPassword = false;
      }
    });
  },
};
</script>
