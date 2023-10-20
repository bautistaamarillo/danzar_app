<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="name"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchName"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Items List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(item, index) in items"
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
            <label><strong>Name:</strong></label> {{ currentItem.name }}
          </div>
          <div>
            <label><strong>Amount:</strong></label> {{ currentItem.amount }}
          </div>
          <div>
            <label><strong>Category_id:</strong></label> {{ currentItem.category_id }}
          </div>
  
          <router-link :to="'/items/' + currentItem.id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on an Item...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ItemDataService from "../services/ItemDataService";
  
  export default {
    name: "items-list",
    data() {
      return {
        items: [],
        currentItem: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveItems() {
        ItemDataService.getAll()
          .then(response => {
            this.Items = response.data;
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
        ItemDataService.findByName(this.name)
          .then(response => {
            this.items = response.data;
            this.setActiveItem(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
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