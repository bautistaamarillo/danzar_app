<template>
    <div>
      <h1>Operar Items</h1>
      <form @submit.prevent>
        
        Nombre
        <input type="text" v-model="name"> <br>
        Monto
        <input type="number" v-model="amount"> <br>
        Categoria
        <input type="number" v-model="category_id"> <br>
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
        amount: "",
        category_id: "",
        };
    },
    methods: {
      crear() {
        var url = "http://localhost/danzar_api/public/items"
        var msg = {
            name: this.name,
            amount: this.amount,
            category_id: this.category_id
        }
        console.log(url, msg)
          axios
          .post(url, msg)
          .then((response) => {
          // Mostramos los datos obtenidos en la consola
          console.log(response);
          this.items = response.data;
          })
          .catch(function (error) {
          // Si hubo algun error mostramos algo
          console.log(error);
          });
      },
    }
  };
  </script>