<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <HeaderPengaturan :profile="profile" />
          <BodyPengaturan :profile="profile" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Aside from "../components/Aside.vue";
import HeaderPengaturan from "../components/Pengaturan/HeaderPengaturan.vue";
import BodyPengaturan from "../components/Pengaturan/BodyPengaturan.vue";
export default {
  components: { Aside, HeaderPengaturan, BodyPengaturan },
  name: "Pengaturan",
  data() {
    return {
      profile: "",
    };
  },
  mounted: function() {
    axios
      .get("api/v1/profile", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.profile = response.data.data;
      });
  },
};
</script>
