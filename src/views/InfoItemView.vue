<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por nombre" v-model="name" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchName">
            Buscar
          </button>
        </div>
      </div>

      <button type="button" class="btn btn-primary" @click="Abm('create', ItemId)">
        Añadir
      </button>
      <div v-if="visible_item === true">
        <AbmItemView :action=action :ItemId=ItemId v-on:cerrar="close()" />
      </div>
    </div>

    <div class="col-md-6">
      <h4>Listado de items</h4>
      <ul class="list-group">
        <table>
          <tr :class="{ active: index == currentIndex }" v-for="(item, index) in filteredItems"
            :key="index" @click="setActiveItem(item, index)">
            <td class="list-group-item">
              {{ item.name }}
            </td>
            <td>
              <button class="btn btn-outline-warning" @click="Abm('edit', item.id)">
                Editar
              </button>
            </td>
            <td>
              <button class="btn btn-outline-danger" @click="Abm('delete', item.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </table>
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
          <label><strong>Categoria:</strong></label> {{ currentItem.category_id }}
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
import ItemDataService from "@/services/ItemDataService";
import AbmItemView from "@/components/ABM/AbmItemView.vue"

export default {
  name: "items-list",
  data() {
    return {
      items: [],
      currentItem: null,
      currentIndex: -1,
      name: "",
      filteredItems: [],
      visible_item: false,
      action: '',
    };
  },
  components: {
    AbmItemView
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

    setActiveItem(item, index) {
      this.currentItem = item;
      this.currentIndex = item ? index : -1;
    },

    searchName() {
      this.filteredItems = this.items.filter((item) => item.name.includes(this.name))
      this.setActiveItem(null);
    },

    Abm(action, ItemId) {
      this.action = action
      this.ItemId = ItemId
      this.visible_item = !this.visible_item
      console.log(action, ItemId, this.visible_item)
    },

    close() {
      this.visible_item = false
      this.retrieveItems();
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