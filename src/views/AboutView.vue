<template>
  <div>
    <h1>Prueba, muestro categorias.</h1>
    <br />

    <div class="div_tabla_categorias">
      <table class="tabla_categorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td>{{ categoria.id }}</td>
            <td>{{ categoria.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categorias: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost/danzar_api/public/categories")
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
  methods: {},
};
</script>

<style>
.div_tabla_categorias {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabla_categorias {
  background-color: #caecae;
}
</style>