<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <article>
            <TableGuardian />
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from '../../components/Aside.vue'
import TableGuardian from '../../components/Guardian/TableGuardian.vue'
export default {
  components: {Aside, TableGuardian},
  name: 'DataGuardian',
}
</script>