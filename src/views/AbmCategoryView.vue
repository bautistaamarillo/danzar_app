<template>
    <div>
      <h1>Nueva Categoria</h1>
      <form>
        Nombre
        <input type="text" v-model="name"> <br>
        <input type="submit" value="ok" @click="enviar()">
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
        enviar() {
            axios
            .post("http://localhost/danzar_api/public/categories", 
            {
                name: this.name
            })
            .then((response) => {
            // Mostramos los datos obtenidos en la consola
            console.log(response);
            this.categorias = response.data;
            })
            .catch(function (error) {
            // Si hubo algun error mostramos algo
            console.log(error);
            });
        }
    }
  };
  </script>