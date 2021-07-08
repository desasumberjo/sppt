<template>
  <div class="row d-flex justify-content-between">
    <div class="col d-flex justify-content-between my-4">
      <h2>Pindah Data Pamong</h2>
    </div>
  </div>
  <div class="my-3">
    <label class="form-label">Pilih Pamong</label>
    <div class="dropdown d-grid gap-2">
      <select class="form-select" aria-label="Default select example" v-model="guardianID">
        <option v-for="guardian in guardian" :key="guardian.id">{{ guardian.id }} - {{ guardian.name }}</option>
      </select>
    </div>
  </div>
  <table class="table">
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
        <td>{{ result.taxpayer.address.rt }}</td>
        <td>{{ result.taxpayer.address.rw }}</td>
        <td>
          <input type="checkbox" :value="`${result.tax_object.nop}`" v-model="checkedNOP" />
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-flex justify-content-end mt-4">
    <button @click="submit" class="btn btn-primary">Kirim</button>
  </div>
  <p>{{ data }}</p>
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
