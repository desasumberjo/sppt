<template>
  <h2>Pengaturan</h2>
  <div class="row">
    <div class="col-1">
      <img
        src="../../assets/pp.jpg"
        alt="profile picture"
        class="img-fluid rounded-circle my-4 p-1 d-none
        d-md-block shadow"
      />
    </div>
    <div class="col d-flex align-items-center mt-3">
      <p class="navbar-brand mx-0 font-weight text-nowrap">
        {{ profile.name }} <br /><span class="fs-6" style="color: #7A7E86">{{ profile.occupation }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["profile"],
  data() {
    return {
      name: "",
      occupation: "",
    };
  },
};
</script>
