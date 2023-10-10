<template>
    <div>
      <h1>Operar Categorias</h1>
      <form>
        Nombre
        <input type="text" v-model="name"> <br>
        <input type="submit" value="nuevo" @click="crear()">
      </form>
    </div>
  </template>
  
  <script>
 
 import axios from "axios";
  export default {
    components: {

    },
    data() {
        return {
        name: "",
        };
    },
    methods: {
      crear() {
        var url = "http://localhost/danzar_api/public/categories"
        var msg = {name: this.name}
        console.log(url, msg)
          axios
          .post(url, msg)
          .then((response) => {
          // Mostramos los datos obtenidos en la consola
          console.log(response);
          this.categorias = response.data;
          })
          .catch(function (error) {
          // Si hubo algun error mostramos algo
          console.log(error);
          });
      },
    }
  };
  </script>