<template>
  <table class="table table-hover">
    <thead class="table-secondary">
      <tr>
        <th>NOP</th>
        <th>Jumlah</th>
        <th>Tahun</th>
        <th>Status Pembayaran</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results" :key="result">
        <td @click="detail(result.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ nop }}</td>
        <td @click="detail(result.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">Rp. {{ result.amount }}</td>
        <td @click="detail(result.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.year }}</td>
        <td @click="detail(result.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">{{ result.payment_status }}</td>
        <td>
          <svg @click="edit(result)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
          <span>&nbsp;&nbsp;</span>
          <svg @click="deleteTax(result)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
          </svg>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Detail</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Nama : {{ modalData.name }}</p>
          <p>NOP : {{ modalData.nop }}</p>
          <p>Tahun : {{ modalData.year }}</p>
          <p>Jumlah : {{ modalData.amount }}</p>
          <p>Status Pembayaran : {{ modalData.paymentStatus }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      nop: "",
      results: null,
      modalData: {
        name: "",
        nop: "",
        year: "",
        amount: "",
        paymentStatus: "",
      },
    };
  },
  methods: {
    detail(id) {
      axios.get("api/v1/sppt/tax-history/" + id).then((response) => {
        let sppt = response.data.data.sppt;
        this.modalData.name = sppt.taxpayer_name;
        this.modalData.nop = sppt.nop;
        this.modalData.year = response.data.data.tax_histories.year;
        this.modalData.amount = response.data.data.tax_histories.amount;
        this.modalData.paymentStatus = response.data.data.tax_histories.payment_status;
      });
    },
    edit(result) {
      console.log(result);
      sessionStorage.setItem("data", JSON.stringify(result));
      this.$router.push({ name: "EditTax" });
    },
    deleteTax(result) {
      axios
        .delete("api/v1/sppt/tax-history/" + result.id, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.results.splice(this.results.indexOf(result.id), 1);
        });
    },
  },
  mounted: function() {
    axios
      .get("api/v1/sppt/tax-histories/" + sessionStorage.getItem("spptID"), {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.nop = response.data.data.sppt.nop;
        this.results = response.data.data.tax_histories;
      });
  },
};
</script>

<style>
svg {
  cursor: pointer;
}
td {
  cursor: pointer;
}
</style>
