<template>
  <div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
      <Aside />
      <main class="col px-0 flex-grow-1 mx-5 my-5">
        <div class="conainer py-3">
          <article>
            <TableDelete />
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from '../../components/Aside.vue'
import TableDelete from '../../components/Guardian/TableDelete.vue'
export default {
  components: {Aside, TableDelete},
  name: 'DeleteGuardian',
}
</script>