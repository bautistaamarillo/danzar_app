<template>
   <div v-for="payment in registro" :key="payment.id">
          {{ payment.id }}
          {{ payment.student_id }}
          
  
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
          registro : {
            student_id: ""
          },
        };
    },
  
    mixins: [FuncionesUtilidades],
  
  mounted() {
  },
  
    methods: {
      crear() {
        var url = "http://localhost/danzar_api/public/payments"
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