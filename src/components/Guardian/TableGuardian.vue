<template>
  <div class="row d-flex justify-content-between">
    <div class="col d-flex justify-content-between my-4">
      <h3>Data Pamong</h3>
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
      <tr v-for="result in results" :key="result.id">
        <td>{{ result.id }}</td>
        <td>{{ result.name }}</td>
        <td>
          <svg @click="editGuardian(result.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
          <span>&nbsp;&nbsp;</span>
          <svg @click="deleteGuardian(result.id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
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
      results: "",
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
          this.results.splice(this.results.indexOf(id), 1);
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
        this.results = response.data.data;
      });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");
h3 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
th {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
td {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}
svg {
  cursor: pointer;
}
</style>
