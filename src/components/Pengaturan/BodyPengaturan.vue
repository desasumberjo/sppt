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

  <div class="mb-3 mt-4">
    <label class="form-label">Foto Profile</label>
    <input class="form-control" type="file" @change="onFileChange" />
  </div>

  <div class="row">
    <div class="col-12 mt-4">
      <label class="form-label">Kata Sandi Baru</label>
      <input placeholder="Kata sandi bisa dikosongi jika tidak diubah" v-on:keyup.enter="updateProfile" v-model="password" type="password" class="form-control" />
      <div class="form-text">
        Password harus memiliki 8 karakter
      </div>
    </div>
    <div class="col-12 mt-4">
      <label class="form-label">Ulangi Kata Sandi</label>
      <input placeholder="Kata sandi bisa dikosongi jika tidak diubah" v-on:keyup.enter="updateProfile" v-model="confirmNewPassword" type="password" class="form-control" />
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
      profilePicture: null,
      password: "",
      confirmNewPassword: "",
      isLoading: false,
      isError: false,
      alertPassword: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.profilePicture = event.target.files[0];
      console.log(this.profilePicture);
    },
    updateProfile() {
      this.isLoading = true;
      if (this.password === this.confirmNewPassword) {
        const fd = new FormData();
        fd.append("_method", "patch");
        fd.append("name", this.name);
        fd.append("occupation", this.occupation);
        fd.append("username", this.username);
        fd.append("email", this.email);
        if (this.profilePicture !== null) {
          fd.append("image", this.profilePicture);
        }
        fd.append("confirmation_password", this.oldPassword);
        fd.append("new_password", this.password);
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
          .catch((error) => {
            this.isLoading = false;
            this.isError = true;
            console.log(error.response.data);
          });
      }
    },
  },
  mounted: function() {
    axios
      .get("api/v1/profile", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.name = response.data.data.name;
        this.occupation = response.data.data.occupation;
        this.username = response.data.data.username;
        this.email = response.data.data.email;
      });
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
