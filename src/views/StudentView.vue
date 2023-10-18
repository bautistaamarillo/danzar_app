<template>

  <div id="app">
    <!-- <div class="ui fixed inverted menu vue-color"> -->
    <div class="ui container">
      <a href="#" class="header item"> Lista Estudiantes </a>
    </div>
  </div>
  Añadir Nuevo:<input v-model="check" type="checkbox"> 
     <div v-if="check === true">
      <AbmStudent />
     </div>
  <div class="ui main container">
    
    <tr v-for="student in resultados" :key="student.id">
  
    <td>{{ student.id }}</td>
    <td>{{ student.name }}</td>
    <td>{{ student.last_name }}</td>
    <td>{{ student.dni }}</td>
    
  </tr>
  </div>

     
  
</template>
  
  <script>
import AbmStudent from "@/components/AbmStudent.vue";
import FuncionesUtilidades from "@/components/FuncionesUtilidades.vue";

//  import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      check: false,
      resultados: [],
    };
  },
  components: {
    AbmStudent
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