<template>
  <h2>Pengaturan</h2>
  <div class="row">
    <div class="col-1">
      <img
        src="../../assets/profile.png"
        alt="profile picture"
        class="img-fluid rounded-circle my-4 p-1 d-none
        d-md-block shadow"
      />
    </div>
    <div class="col d-flex align-items-center mt-3">
      <p class="navbar-brand mx-0 font-weight text-nowrap">
        {{ name }} <br /><span class="fs-6" style="color: #7A7E86">{{ occupation }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      occupation: "",
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
        this.name = response.data.data.name;
        this.occupation = response.data.data.occupation;
      });
  },
};
</script>
