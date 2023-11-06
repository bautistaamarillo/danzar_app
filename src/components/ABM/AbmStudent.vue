<template>
  <div>
    <h1></h1>

      Nombre
      <input type="text" v-model="registro.name"> <br>
      Apellido
      <input type="text" v-model="registro.last_name"> <br>
      DNI
      <input type="text" v-model="registro.dni"> <br>
      Direccion
      <input type="text" v-model="registro.address"> <br>
      Tel
      <input type="text" v-model="registro.phone_number"> <br>
      Observaciones
      <input type="text" v-model="registro.observations"> <br>
      Fecha cumpleaños
      <input type="date" v-model="registro.birthdate"> <br>
      Activo
      <input type="text" v-model="registro.active"> <br>
      <input type="submit" value="nuevo" @click="crear()">
   
  </div>
</template>

<script>

import axios from "axios";
import FuncionesUtilidades from "@/components/FuncionesUtilidades.vue";
export default {
  components: {

  },
  data() {
      return {
        registro :
        {name: "",
        dni: "",
        last_name: "",
        address: "",
        phone_number: "",
        observations: "",
        birthdate: "",
        active: ""
      },
      };
  },

  mixins: [FuncionesUtilidades],

mounted() {
},

  methods: {
    crear() {
      var url = "http://localhost/danzar_api/public/students"
      var msg = this.registro;
      console.log(url, msg)
        axios
        .post(url, msg)
        .then((response) => {
      
        console.log(response);
        this.resultados = response.data;
        })
        .catch(function (error) {
       
        console.log(error);
        });
      
    },
    
  }
};
</script>