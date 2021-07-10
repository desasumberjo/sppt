<template>
  <h2>Pengaturan</h2>
  <div class="row">
    <div class="col-1">
      <img
        v-if="profilePicture != null"
        :src="`${profilePicture}`"
        alt="profile picture"
        class="img-fluid rounded-circle my-4 p-1 d-none
        d-md-block shadow"
      />
      <svg
        v-if="profilePicture == null"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        fill="currentColor"
        class="bi bi-person img-fluid rounded-circle my-4 p-1 d-none
        d-md-block shadow"
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
      </svg>
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
      profilePicture: "",
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
        this.profilePicture = response.data.data.image_url;
      });
  },
};
</script>
