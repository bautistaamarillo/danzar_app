<template>
  <div id="app">
    <!-- <div class="ui fixed inverted menu vue-color"> -->
    <div class="ui container">
      <a href="#" class="header item"> Lista Estudiantes </a>
    </div>
  </div>
  <div class="ui main container">
    <StudentList />
  </div>
  <!-- </div> -->
  <tr v-for="student in students" :key="student.id">
    <td>{{ student.id }}</td>
    <td>{{ student.name }}</td>
  </tr>
</template>
  
  <script>
import StudentList from "@/components/StudentList.vue";
import FuncionesUtilidades from "@/components/FuncionesUtilidades.vue";

//  import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      students: [],
    };
  },
  components: {
    StudentList,
  },
  mixins: [FuncionesUtilidades],

  mounted() {
    this.getData("students");
  },
  methods: {},
};
</script>
  <style>
.vue-color {
  background: rgb(0, 162, 255) !important ;
}
</style>