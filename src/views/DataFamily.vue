<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <article>
            <Search />
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import Search from "../components/DataFamily/Search.vue";
import { useRouter } from "vue-router";
export default {
  components: { Aside, Search },
  name: "DataFamily",
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
