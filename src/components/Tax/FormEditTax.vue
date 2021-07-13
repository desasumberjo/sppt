<template>
  <div class="container-fluid">
    <h3>Tambah Pajak</h3>

    <div class="mt-4">
      <label class="form-label">Tahun</label>
      <input v-on:keyup.enter="patchAddTax" v-model="year" type="number" class="form-control" />
    </div>
    <div class="mt-4">
      <label class="form-label">Jumlah</label>
      <input aria-describedby="basic-addon1" v-on:keyup.enter="patchAddTax" v-model="amount" type="number" class="form-control" />
    </div>
    <div class="mt-4">
      <label class="form-label">Status Pembayaran</label>
      <input class="form-control" list="listOptionsPayment" placeholder="Type to search..." v-model="paymentStatus" />
      <datalist id="listOptionsPayment">
        <option>Lunas</option>
        <option>Belum Dibayar</option>
      </datalist>
    </div>

    <div class="alert alert-danger mt-4" role="alert" v-if="isError">
      Data yang anda masukkan Belum Lengkap
    </div>

    <div class="d-flex justify-content-end mt-4">
      <button @click="submitAddTax" class="btn btn-primary" :disabled="isLoading"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-if="!isLoading">Kirim</span></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: "",
      year: "",
      amount: "",
      paymentStatus: "",
      isLoading: false,
      isError: false,
    };
  },
  methods: {
    patchAddTax() {
      axios
        .patch(
          "api/v1/sppt/tax-history/" + this.id,
          {
            sppt_id: sessionStorage.getItem("spptID"),
            year: this.year,
            amount: this.amount,
            payment_status: this.paymentStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          this.$router.push({ name: "Tax" });
        })
        .catch(() => {
          this.isError = true;
        });
    },
  },
  mounted: function() {
    let data = JSON.parse(sessionStorage.getItem("data"));
    this.id = data.id;
    this.year = data.year;
    this.amount = data.amount;
    this.paymentStatus = data.payment_status;
  },
};
</script>
