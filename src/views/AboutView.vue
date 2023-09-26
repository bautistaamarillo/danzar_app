<template>
  <div>
    <h1>Prueba, muestro categorias.</h1>
    <br />

    <div class="div_tabla_categorias">
    <table class="tabla_categorias">
      <thead>
        <tr>
          <th> ID </th>
          <th> NOMBRE </th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in datos" :key="categoria.id">
          <td>{{categoria.id}}</td>
          <td>{{categoria.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    datos: [
      { id: 1, name: "Inscripci\u00f3n", created_at: null, updated_at: null },
      { id: 2, name: "Disciplina", created_at: null, updated_at: null },
      {
        id: 3,
        name: "pepita",
        created_at: null,
        updated_at: "2023-09-18T19:39:49.000000Z",
      },
      { id: 4, name: "Recargo", created_at: null, updated_at: null },
      { id: 5, name: "Descuento", created_at: null, updated_at: null },
    ],
  }),
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