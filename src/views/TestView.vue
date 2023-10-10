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

 import StudentList from '@/components/StudentList.vue';
 import axios from "axios";
  export default {
    name:"App",
     data() {
    return {
      students: [],
    };
  },
  components: {
      StudentList
    },
  mounted() {
    axios
      .get("http://localhost/danzar_api/public/students")
      .then((response) => {
        // Mostramos los datos obtenidos en la consola
        console.log(response);
        this.students = response.data;
      })
      .catch(function (error) {
        // Si hubo algun error mostramos algo
        console.log(error);
      });
  },
  methods: {
  },
  };
  </script>
  <style>
.vue-color{
  background:rgb(0, 162, 255) !important ;
}
</style>