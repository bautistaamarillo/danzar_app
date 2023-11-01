<template>
    <div v-if="currentItem" class="edit-form">
      <h4>Item</h4>
      <!-- <form>
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name"
            v-model="currentItem.name"
          />
        </div>
        <div class="form-group">
          <label for="amount">Precio</label>
          <input type="number" class="form-control" id="amount"
            v-model="currentItem.amount"
          />
        </div>
        <div class="form-group">
          <label for="category_id">ID de categoria</label>
          <input type="number" class="form-control" id="category_id"
            v-model="currentItem.category_id"
          />
        </div>
  
      </form> -->
  
      <!-- <button class="btn btn-outline-danger"
        @click="deleteItem"
      >
        Eliminar
      </button> -->
  
      <button type="submit" class="btn btn-outline-secondary"
        @click="updateItem"
      >
        Actualizar
      </button>
      <p>{{ message }}</p>
    </div>
  
    <div v-else>
      <br />
      <p>Por favor seleccione un Item...</p>
    </div>
  </template>
  
  <script>
  import ItemDataService from "@/services/ItemDataService";
  import axios from 'axios';
  
  export default {
    name: "ItemView",
    props: ["ItemId"],
    data() {
      return {
        currentItem: null,
        message: ''
      };
    },
    methods: {
      getItem(id) {
        ItemDataService.get(id)
          .then(response => {
            this.currentItem = response.data[0];
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      updateItem() {
        ItemDataService.update(this.currentItem.id, this.currentItem)
          .then(response => {
            console.log(response.data);
            this.message = 'The item was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      deleteItem() {
        ItemDataService.delete(this.currentItem.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "items" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.message = '';
      this.getItem(this.$route.params.id);
      axios
        .get('http://localhost/danzar_api/public/items/' + this.ItemId)
          .then((response) => {
            console.log(response);
            this.currentItem = response.data[0];
          })
          .catch(function (error) {
          console.log(error);
          });
    }
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>