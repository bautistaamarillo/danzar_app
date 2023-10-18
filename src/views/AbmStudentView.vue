<!-- <template>
    <div>
      <h1>Operar Categorias</h1>
      <form @submit.prevent>
        
        Nombre
        <input type="text" v-model="registro.name"> <br>
        <input type="submit" value="nuevo" @click="crear()">
      </form>
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
        registro: {
          name: "",
          last_name: ""
        },
        };
    },

    mixins: [FuncionesUtilidades],

mounted() {
},

    methods: {
      crear() {
        var url = "http://localhost/danzar_api/public/students"
        var msg = {
            name: this.name,
            last_name: this.last_name,
        }
        console.log(url, msg)
          axios
          .post(url, msg)
          .then((response) => {
        
          console.log(response);
          this.students = response.data;
          })
          .catch(function (error) {
         
          console.log(error);
          });
      },
      
    }
  };
  </script> -->