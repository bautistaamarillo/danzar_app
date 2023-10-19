<template>
    <div class="card">
  <div class="card-body">
    <h1> Estas son las categorias. </h1>
  </div>
</div>

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="categoria in categorias" :key="categoria.id">
            <td>{{ categoria.id }}</td>
            <td>{{ categoria.name }}</td>
            <td>  <button type="button" class="btn btn-outline-warning" @click="editar()">Editar</button>
              <button type="button" class="btn btn-outline-danger" @click="eliminar()">  Eliminar </button>
              <button type="button" class="btn btn-outline-info" @click="consultar()">Info</button>
              </td>
          </tr>
          
  </tbody>
</table>

    Añadir Nuevo:<input v-model="check" type="checkbox"> 
     <div v-if="check === true">
    <AbmCategoryView/>
     </div>
      </template>


<script>
import AbmCategoryView from "./AbmCategoryView.vue"
import axios from "axios";
export default {
  data() {
    
    return {
      check: false,
      categorias: [],
    };
  },
  components: {
    AbmCategoryView
    
  },
  mounted() {
    axios
      .get("http://localhost/danzar_api/public/categories")
      .then((response) => {
        
        console.log(response);
        this.categorias = response.data;
      })
      .catch(function (error) {
      
        console.log(error);
      });
  },
  methods: {
        modificar() {
          var url = "http://localhost/danzar_api/public/categories/${categoria.id}"
          var msg = {name: this.name}
          console.log(url, msg)
            axios
            .put(url, msg)
            .then((response) => {
          
            console.log(response);
            this.categorias = response.data;
            })
            .catch(function (error) {
            // Si hubo algun error mostramos algo
            console.log(error);
            });
        },
        eliminar() {
          console.log("hola");
          // var url = "http://localhost/danzar_api/public/categories/"
          // var msg = {name: this.name}
          // console.log(url, msg)
          //   axios
          //   .delete(url, msg)
          //   .then((response) => {
          //   // Mostramos los datos obtenidos en la consola
          //   console.log(response);
          //   this.categorias = response.data;
          //   })
          //   .catch(function (error) {
          //   // Si hubo algun error mostramos algo
          //   console.log(error);
          //   });
        }
  },
};
</script>

<style>

</style>