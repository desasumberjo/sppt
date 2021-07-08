<template>
  <div class="row d-flex justify-content-between">
    <div class="col d-flex justify-content-between my-4">
      <h2>Data Pamong</h2>
      <button @click="addGuardian" class="btn btn-primary">
        Tambah Pamong
      </button>
    </div>
  </div>
  <table class="table">
    <thead class="table-secondary">
      <tr>
        <th>ID</th>
        <th>Nama</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in result" :key="result.id">
        <td>{{ result.id }}</td>
        <td>{{ result.name }}</td>
        <td>
          <img src="../../assets/Pencarian/pencil-square.svg" alt="" @click="editGuardian(result.id)" />
          <img @click="deleteGuardian(result.id)" class="ms-2" src="../../assets/Pencarian/trash.svg" alt="" />
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
      result: "",
    };
  },
  methods: {
    addGuardian() {
      this.$router.push({ name: "AddGuardian" });
    },
    editGuardian(id) {
      sessionStorage.setItem("IDGuardian", id);
      this.$router.push({ name: "EditGuardian" });
    },
    deleteGuardian(id) {
      axios
        .delete("api/v1/guardian/" + id, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          sessionStorage.setItem("IDGuardian", id);
          this.$router.push({ name: "DeleteGuardian" });
        });
    },
  },
  mounted: function() {
    axios
      .get("api/v1/guardians", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.result = response.data.data;
      });
  },
};
</script>
