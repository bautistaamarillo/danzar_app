<template>

</template>

<script>

import axios from "axios";
export default {
  name: 'FuncionesUtilidades',
  methods: {
    async getData(endpoint) {
    axios
      .get("http://localhost/danzar_api/public/"+endpoint)
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
  },
  
};


</script>