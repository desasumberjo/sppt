<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <form>
            <DataPersonal />
            <DataAlamat />
            <DataMutasi />
            <div class="alert alert-danger" role="alert" v-if="isError">
              Data yang anda masukkan Belum Lengkap
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button type="button" class="btn btn-primary" @click="send" :disabled="isLoading"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-if="!isLoading">Kirim</span></button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Aside from "../components/Aside.vue";
import DataPersonal from "../components/MutasiData/DataPersonal.vue";
import DataAlamat from "../components/MutasiData/DataAlamat.vue";
import DataMutasi from "../components/MutasiData/TargetMutasi.vue";
import { useRouter } from "vue-router";
export default {
  components: { Aside, DataPersonal, DataAlamat, DataMutasi },
  name: "MutasiDataPersonal",
  data() {
    return {
      isError: false,
      isLoading: false,
    };
  },
  methods: {
    send() {
      this.isLoading = true;
      axios
        .post(
          "api/v1/sppt/mutation",
          {
            nop_target: sessionStorage.getItem("nopTarget"),
            nop: sessionStorage.getItem("nop"),
            block_number: sessionStorage.getItem("blockNumber"),
            determnination: sessionStorage.getItem("determination"),
            taxpayer_name: sessionStorage.getItem("taxPayerName"),
            family_id: sessionStorage.getItem("familyId"),
            guardian_id: sessionStorage.getItem("guardianID"),
            taxpayer_road: sessionStorage.getItem("taxPayerRoad"),
            taxpayer_rt: sessionStorage.getItem("taxPayerRT"),
            taxpayer_rw: sessionStorage.getItem("taxPayerRW"),
            taxpayer_village: sessionStorage.getItem("taxPayerVillage"),
            tax_object_road: sessionStorage.getItem("taxObjectRoad"),
            tax_object_rt: sessionStorage.getItem("taxObjectRT"),
            tax_object_rw: sessionStorage.getItem("taxObjectRW"),
            tax_object_village: sessionStorage.getItem("taxObjectVillage"),
            sppt_persil_number: sessionStorage.getItem("spptPersilNumber"),
            land_area: sessionStorage.getItem("landArea"),
            land_area_unit: "m2",
            building_area: sessionStorage.getItem("buildingArea"),
            building_area_unit: "m2",
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          sessionStorage.removeItem("nopTarget"), sessionStorage.removeItem("nop"), sessionStorage.removeItem("blockNumber"), sessionStorage.removeItem("determination"), sessionStorage.removeItem("taxPayerName"), sessionStorage.removeItem("familyId"), sessionStorage.removeItem("guardianID"), sessionStorage.removeItem("taxPayerRoad"), sessionStorage.removeItem("taxPayerRT"), sessionStorage.removeItem("taxPayerRW"), sessionStorage.removeItem("taxPayerVillage"), sessionStorage.removeItem("taxObjectRoad"), sessionStorage.removeItem("taxObjectRT"), sessionStorage.removeItem("taxObjectRW"), sessionStorage.removeItem("taxObjectVillage"), sessionStorage.removeItem("spptPersilNumber"), sessionStorage.removeItem("landArea"), sessionStorage.removeItem("buildingArea"), this.$router.push({ name: "Pencarian" });
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.isError = true;
          console.log(error.response.data);
        });
    },
  },
  mounted: function() {
    const token = sessionStorage.getItem("token");
    const router = useRouter();
    if (!token) {
      return router.push({
        name: "Login",
      });
    }
  },
};
</script>
