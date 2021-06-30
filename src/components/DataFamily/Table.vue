<template>
  <table class="table">
    <thead class="table-secondary">
      <tr>
        <th>ID</th>
        <th>Nama Keluarga</th>
        <th>RT</th>
        <th>RW</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in resultData" :key="result.id">
        <td>{{result.id}}</td>
        <td>{{result.name}}</td>
        <td>{{result.rt}}</td>
        <td>{{result.rw}}</td>
        <td>
          <img src="../../assets/Pencarian/pencil-square.svg" alt="" @click="editFamily(result.id)">
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['resultData'],
  data(){
    return{
      result: null
    }
  },
  methods:{
    editFamily(id){
      sessionStorage.setItem("idFamily", id);
      this.$router.push({ name: "EditFamily" });
    }
  }
}
</script>