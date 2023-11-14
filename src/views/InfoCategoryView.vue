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

      <button type="button" class="btn btn-primary" @click="Abm('create', CategoryId)">
        Añadir
      </button>
      <div v-if="visible_category === true">
        <AbmCategoryView :action="action" :CategoryId="CategoryId" v-on:cerrar="close()" />
      </div>
    </div>
    <div class="col-md-6">
      <h4>Listado de categorias</h4>
      <ul class="list-group">
        <table>
          <tr :class="{ active: index == currentIndex }" v-for="(category, index) in filteredCategories"
          :key="index" @click="setActiveCategory(category, index)">
            <td>
              {{ category.name }}
            </td>
            <td>
              <button class="btn btn-outline-warning" @click="Abm('edit', category.id)">
                Editar
              </button>
            </td>
            <td>
              <button class="btn btn-outline-danger" @click="Abm('delete', category.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </table>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentCategory">
        <h4>Categoria</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentCategory.name }}
        </div>

      </div>
      <div v-else>
        <br />
        <p>Por favor seleccione una categoria...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryDataService from "@/services/CategoryDataService";
import AbmCategoryView from "@/components/ABM/AbmCategoryView.vue";

export default {
  name: "categories-list",
  data() {
    return {
      categories: [],
      currentCategory: null,
      currentIndex: -1,
      name: "",
      filteredCategories: [],
      visible_category: false,
      action: "",
    };
  },
  components: {
    AbmCategoryView,
  },
  methods: {
    retrieveCategories() {
      CategoryDataService.getAll()
        .then((response) => {
          this.categories = response.data;
          this.searchName();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCategories();
      this.currentCategory = null;
      this.currentIndex = -1;
    },

    setActiveCategory(category, index) {
      this.currentCategory = category;
      this.currentIndex = category ? index : -1;
    },

    searchName() {
      this.filteredCategories = this.categories.filter((category) =>
        category.name.includes(this.name)
      );
      this.setActiveCategory(null);
    },

    Abm(action, CategoryId) {
      this.action = action;
      this.CategoryId = CategoryId;
      this.visible_category = !this.visible_category;
      console.log(action, CategoryId, this.visible_category);
    },

    close() {
      this.visible_category = false;
      this.retrieveCategories();
    },
  },
  mounted() {
    this.retrieveCategories();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>