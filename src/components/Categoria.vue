<script>
// import axios from "axios"
// import {ref , onMounted} from 'vue'
// const categoria = ref{[]}
fetch("http://localhost:8080/categoria"+id)
.then(data=>data.json())
.then (data=>{
     nombre = data.name;
})
</script>
<template>
    
  </template>
  