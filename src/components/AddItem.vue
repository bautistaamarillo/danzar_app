<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="item.name"
            name="name"
          />
        </div>
  
        <div class="form-group">
          <label for="amount">Precio</label>
          <input
            class="form-control"
            id="amount"
            required
            v-model="item.amount"
            name="amount"
          />
        </div>

        <div class="form-group">
          <label for="category_id">ID de Categoria</label>
          <input
            class="form-control"
            id="category_id"
            required
            v-model="item.category_id"
            name="category_id"
          />
        </div>
  
        <button @click="saveItem" class="btn btn-success">Guardar</button>
      </div>
  
      <div v-else>
        <h4>Item guardado con exito!</h4>
        <button class="btn btn-success" @click="newItem">Nuevo</button>
      </div>
    </div>
  </template>
  
  <script>
  import ItemDataService from "../services/ItemDataService";
  
  export default {
    name: "add-item",
    data() {
      return {
        item: {
          id: null,
          name: "",
          amount: "",
          category_id: ""
        },
        submitted: false
      };
    },
    methods: {
      saveItem() {
        var data = {
          name: this.item.name,
          amount: this.item.amount,
          category_id: this.item.category_id
        };
  
        ItemDataService.create(data)
          .then(response => {
            this.item.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newItem() {
        this.submitted = false;
        this.item = {};
      }
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>