<template>
  <tr>
        <th scope="col">ID</th>
        <th scope="col">Estudiante</th>
        
      </tr>
 <tr v-for="payment in payments" :key="payment.id">
        <td>  {{ payment.id }}</td>
        <td> {{ payment.student_id }}</td>
          
  
 </tr>
  <AbmPayment></AbmPayment>
  </template>
  <script>
  import AbmPayment from "@/components/ABM/AbmPayment.vue";
  import FuncionesUtilidades from "@/components/FuncionesUtilidades.vue";
  import axios from "axios";
  export default {
    name: "App",
    data() {
      return {
       payments: []
      };
    },
    components: {
      AbmPayment,
    },
    mixins: [FuncionesUtilidades],
  
    mounted() {
      axios
        .get("http://localhost/danzar_api/public/payments")
        .then((response) => {
          console.log(response);
          this.payments = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    
      this.getData("payments");
      
    },
    methods: {},
   
  };
  </script>
  <style>
  .vue-color {
    background: rgb(0, 162, 255) !important ;
  }
  </style>
  