<template>
    <div id="app">
      <div class="ui fixed inverted menu vue-color">
        <div class="ui container">
          <a href="#" class="header item"> Hola </a>
        </div>
      </div>
      <div class="ui main container">

       <StudentList />


      </div>
    </div>
  </template>
  
  <script>

 import StudentList from '@/components/StudentList.vue';
  export default {
    name:"App",
    components: {
      StudentList
    }
  };
  </script>
  <style>
.vue-color{
  background:rgb(0, 162, 255) !important ;
}
</style>