<template>
  <div class="row d-flex justify-content-between">
    <div class="col d-flex justify-content-between my-4">
      <h2>Data Admin</h2>
      <button @click="addAdmin" class="btn btn-primary">
        Tambah Admin
      </button>
    </div>
  </div>
  <table class="table">
    <thead class="table-secondary">
      <tr>
        <th>ID</th>
        <th>Nama</th>
        <th>Nama Pengguna</th>
        <th>Email</th>
        <th>Jabatan</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in result" :key="result.id">
        <td>{{ result.id }}</td>
        <td>{{ result.name }}</td>
        <td>{{ result.username }}</td>
        <td>{{ result.email }}</td>
        <td>{{ result.occupation }}</td>
        <td>
          <img @click="deleteAdmin(result.id)" class="ms-2" src="../../assets/Pencarian/trash.svg" alt="" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      result: null,
    };
  },
  methods: {
    addAdmin() {
      this.$router.push({ name: "TambahAdmin" });
    },
    deleteAdmin(id) {
      axios
        .delete("api/v1/administrator/" + id, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.result = response.data.data;
          window.location.reload();
        });
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      axios
        .get("api/v1/administrators", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.result = response.data.data;
        });
    });
  },
};
</script>
