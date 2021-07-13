<template>
  <div class="container-home">
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">SPPT Desa Sumberjo</span>
        <button @click="handleLogin" class="btn btn-primary">Login</button>
      </div>
    </nav>
    <div class="container mt-3">
      <div class="pencarian">
        <Search />
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Home/Search.vue";
export default {
  name: "Home",
  components: { Search },
  methods: {
    handleLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.container-home {
  height: 100vh;
  background-color: #b0bec5 !important;
}
.pencarian {
  padding: 10px;
  border-radius: 30px !important;
  /* background-color: #fff !important; */
}
</style>
