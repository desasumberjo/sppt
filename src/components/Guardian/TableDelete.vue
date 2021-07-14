<template>
  <div class="row d-flex justify-content-between">
    <div class="col d-flex justify-content-between my-3">
      <h3>Pindah Data Pamong</h3>
    </div>
  </div>
  <div class="my-2">
    <label class="form-label">Pilih Pamong</label>
    <div class="dropdown d-grid gap-2">
      <input class="form-control" list="listOptionsGuardian" placeholder="Type to search..." v-model="guardianID" />
      <datalist id="listOptionsGuardian">
        <option v-for="guardian in guardian" :key="guardian.id">{{ guardian.id }} - {{ guardian.name }}</option>
      </datalist>
    </div>
  </div>
  <div class="alert alert-warning my-3" role="alert">
    Sebelum menghapus pamong, pastikan data yang terkait dipindahkan terlebih dahulu!
  </div>
  <table class="table my-4">
    <thead class="table-secondary">
      <tr>
        <th>NOP</th>
        <th>Nama</th>
        <th>RT</th>
        <th>RW</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in result" :key="result.id">
        <td>{{ result.tax_object.nop }}</td>
        <td>{{ result.taxpayer.name }}</td>
        <td>{{ parseInt(result.taxpayer.address.rt) }}</td>
        <td>{{ parseInt(result.taxpayer.address.rw) }}</td>
        <td>
          <input type="checkbox" :value="`${result.tax_object.nop}`" v-model="checkedNOP" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-end mt-4">
    <button @click="submit" class="btn btn-primary">Kirim</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      guardian: null,
      guardianID: "",
      selectedGuardianID: "",
      result: "",
      checkedNOP: [],
      data: [],
    };
  },
  methods: {
    submit() {
      let regex = /\d+/g;
      this.selectedGuardianID = this.guardianID.match(regex);
      for (let i = 0; i < this.checkedNOP.length; i++) {
        this.data.push({
          nop: this.checkedNOP[i],
          guardian_id: this.selectedGuardianID[0],
        });
      }
      axios
        .patch(
          "api/v1/sppt/guardian-update",
          {
            sppt_objects: this.data,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          axios
            .delete("api/v1/guardian/" + sessionStorage.getItem("IDGuardian"), {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            })
            .then(() => {
              sessionStorage.removeItem("IDGuardian");
              this.$router.push({ name: "DataGuardian" });
            });
        });
    },
  },
  mounted: function() {
    axios
      .get("api/v1/sppt/guardian/" + sessionStorage.getItem("IDGuardian"), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.result = response.data.data;
      });
    axios
      .get("api/v1/guardians", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.guardian = response.data.data;
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
option {
  border-radius: 10px !important;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
</style>
