<template>
 
  <div class="card">
    <div class="card-body">
      <h1>Estudiantes</h1>
    </div>
  </div>

  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Dni</th>
      </tr>
    </thead>
    <tbody>
      <!-- <div class="ui fixed inverted menu vue-color"> -->
      <!-- <div class="ui container"> -->
      <!-- <a href="#" class="header item"> Lista Estudiantes </a> -->

      <!-- </div> -->

      <tr v-for="student in resultados" :key="student.id">
        <td>{{ student.id }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.last_name }}</td>
        <td>{{ student.dni }}</td>
        <td>
          <button
            type="button"
            class="btn btn-outline-warning"
            @click="editar()"
          >
            Editar
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="eliminar()"
          >
            Eliminar
          </button>
          <button
            type="button"
            class="btn btn-outline-info"
            @click="consultar()"
          >
            Info
          </button>
        </td>
        <!-- <td> <button v-on:click="editar()"></button> </td> -->
      </tr>
    </tbody>
  </table>
  
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      @click="estudianteVisible = !estudianteVisible"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Crear Nueva
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Nuevo Estudiante</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body"> 

            <div v-if="estudianteVisible === true">
              <AbmStudent />
            </div>

          </div>
          
        </div>
      </div>
    </div>

    <!-- <button type="button"  @click="categoriaAbmVisible=!categoriaAbmVisible">Añadir Nuevo</button>  -->
  
</template>
<script>
import AbmStudent from "@/components/AbmStudent.vue";
import FuncionesUtilidades from "@/components/FuncionesUtilidades.vue";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      estudianteVisible: false,
      resultados: [],
    };
  },
  components: {
    AbmStudent,
  },
  mixins: [FuncionesUtilidades],

  mounted() {
    axios
      .get("http://localhost/danzar_api/public/students")
      .then((response) => {
        console.log(response);
        this.resultados = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  
    this.getData("students");
    // this.editData("students"+student.id); //"student" no esta definido.
  },
  methods: {},
  // const editar = (student.id) => ; //incompleto
};
</script>
<style>
.vue-color {
  background: rgb(0, 162, 255) !important ;
}
</style>
