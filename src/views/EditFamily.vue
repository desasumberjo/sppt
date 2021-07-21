<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <FormEditKeluarga />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from "../components/Aside.vue";
import FormEditKeluarga from "../components/DataFamily/FormEditKeluarga.vue";
import { useRouter } from "vue-router";
export default {
  components: { Aside, FormEditKeluarga },
  name: "EditFamily",
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
