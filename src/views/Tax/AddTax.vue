<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="container py-5">
          <Form />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from "../../components/Aside.vue";
import Form from "../../components/Tax/FormAddTax.vue";
export default {
  components: { Aside, Form },
  name: "AddTax",
};
</script>
