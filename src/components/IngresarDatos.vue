<template>
  <div>
    <form @submit.prevent="enviarDatos">
    <!-- tendre que usar un @crfs?  -->
      <label for="user">Usuario:</label>
      <input v-model="user" id="id_user" type="text" required><br>

      <label for="password">Contraseña:</label>
      <input v-model="password" id="id_password" type="password" required><br>

      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: '',
    };
  },
  methods: {
    enviarDatos() {
      //metodo/funcion para pasar json de vue a laravel.

    },
  },
};
</script>

<style scoped>

</style>
