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
  mounted() {
    var myHeaders = new Headers();
myHeaders.append("X-CSRF-TOKEN", "K0eZNTqSJMT8RrVBmLqpkMkZceSlFp5N3KdqFvPe");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6ImcxREVqd2JtOXArbUJONUxLeWRJUlE9PSIsInZhbHVlIjoiNXBlT1owMGlpRjFxMmZ3VWVkV1ptZlpYbkNReGpvUGdwenRFYThTS0JnQ2FEaWFxWWZuV0tzb0gyQ3Q4aXVXb1JsNi84b3hVbklFQ3N3Y0xXMll4OXF1YXp2aTJ2ZERPaURneDAzWlBiQXFEYXYyOFZEcXhMSnVjVVlEamxyY1QiLCJtYWMiOiIzMDU3ZDYzZmNlZTE1NTdhZjU1MWYxMDIyZjU2Yjc5NGM2YmQ5Zjc5MTEyYmM2M2VlODlmYmFiODNhM2NjNGZhIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im1NaWtzanVkZzB6SjFxTTBvN01TTlE9PSIsInZhbHVlIjoidFM2RTIrMFNtNnNpRmJ3ZStKb0dUalduaHBKbytyZlBmYng1WDY0aGZPQ2N3NTY3aDFjYXBUWDE4REY2WGJ6N1ZoVVpqODRidVpMeHBFMTdTN01tNVFxaEVMNFlaVktjSUZwMHVQMUsraDRKTEE3a2pLRUVUeGk5RC9SSGVkeHAiLCJtYWMiOiIwZTQxM2IzNGYyYTNiNTc4ZGZmZjg3N2QyZjJmOGI4OTYxZDE0YTc0MmMyOGUzNjJkNTBiNWQ0YzBjYTQxNGFkIiwidGFnIjoiIn0%3D");


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost/danzar_api/public/categories", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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