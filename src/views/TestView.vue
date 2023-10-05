<template>
    <div id="app">
      <div class="ui fixed inverted menu vue-color">
        <div class="ui container">
          <a href="#" class="header item"> Hola </a>
        </div>
      </div>
      <div class="ui main container">

       <Students />


      </div>
    </div>
  </template>
  
  <script>

 import Students from '@/components/Students.vue';
  export default {
    name:"App",
    components: {
      Students
    }
  };
  </script>
  <style>
.vue-color{
  background:rgb(0, 162, 255) !important ;
}
</style>