<template>

    <div class="div_tabla_categorias">
      <table class="tabla_categorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>MONTO</th>
            <th>CATEGORIA</th>
          </tr>
        </thead>
        <tbody>         
          
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.category_id }}</td>
            <td>  <input type="submit" value="editar" @click="modificar()"> 
              <input type="submit" value="borrar" @click="eliminar()"> 
              <input type="submit" value="consultar"> 
              </td>
          </tr>
        </tbody>
      </table>
    </div>
    Añadir Nuevo:<input v-model="check" type="checkbox"> 
     <div v-if="check === true">
    <AbmItemView/>
     </div>
</template>


<script>
import AbmItemView from "./AbmItemView.vue"
import axios from "axios";
export default {
  data() {
    
    return {
      check: false,
      items: [],
    };
  },
  components: {
    AbmItemView
    
  },
  mounted() {
    axios
      .get("http://localhost/danzar_api/public/items")
      .then((response) => {
        
        console.log(response);
        this.items = response.data;
      })
      .catch(function (error) {
      
        console.log(error);
      });
  },
  methods: {
        modificar() {
          var url = "http://localhost/danzar_api/public/items/${item.id}"
          var msg = {
            name: this.name,
            amount: this.amount,
            category_id: this.category_id
          }
          console.log(url, msg)
            axios
            .put(url, msg)
            .then((response) => {
          
            console.log(response);
            this.items = response.data;
            })
            .catch(function (error) {
            // Si hubo algun error mostramos algo
            console.log(error);
            });
        },
        eliminar() {
          console.log("Hasta aca llega la supuesta eliminacion ")
          //
        }
  },
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