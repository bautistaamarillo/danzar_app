<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Busqueda por nombre"
            v-model="name"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchName"
            >
              Buscar
            </button>
          </div>
        </div>
          <button class="btn btn-primary" @click = "add_item = !add_item">Añadir</button>
          <div v-if="add_item === true">
            <AddItem/>
          </div>
      </div>
      <div class="col-md-6">
        <h4>Listado de items</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(item, index) in filteredItems"
            :key="index"
            @click="setActiveItem(item, index)"
          >
            {{ item.name }}
          </li>
        </ul>

      </div>
      <div class="col-md-6">
        <div v-if="currentItem">
          <h4>Item</h4>
          <div>
            <label><strong>Nombre:</strong></label> {{ currentItem.name }}
          </div>
          <div>
            <label><strong>Precio:</strong></label> {{ currentItem.amount }}
          </div>
          <div>
            <label><strong>ID de categoria:</strong></label> {{ currentItem.category_id }}
          </div>
  
          <button class="btn btn-outline-warning" @click = "item_view = !item_view">
            Editar
          </button>
          <div v-if="item_view === true">
            <ItemView
              :ItemId = currentItem.id
            />
          </div>
        </div>
        <div v-else>
          <br />
          <p>Por favor seleccione un Item...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ItemDataService from "../services/ItemDataService";
  import AddItem from "./AddItem.vue"
  import ItemView from "./ItemView.vue"
  
  export default {
    name: "items-list",
    data() {
      return {
        items: [],
        currentItem: null,
        currentIndex: -1,
        name: "",
        filteredItems: [],
        add_item: false,
        item_view: false,
      };
    },
    components: {
    AddItem,
    ItemView
  },
    methods: {
      retrieveItems() {
        ItemDataService.getAll()
          .then(response => {
            this.items = response.data;
            this.searchName();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveItems();
        this.currentItem = null;
        this.currentIndex = -1;
      },
  
      setActiveItem(item, index) {
        this.currentItem = item;
        this.currentIndex = item ? index : -1;
      },
      
      searchName() {
        this.filteredItems = this.items.filter((item) => item.name.includes(this.name))
        this.setActiveItem(null);
      }
    },
    mounted() {
      this.retrieveItems();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>