<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-container" >
        <div v-if="!submitted">
        <button
              type="button"
              class="btn-close"
              @click="closeAbm()"
              aria-label="Close"
            ></button>
        <div class="modal-header">
          <slot name="header">{{ header }}</slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" class="form-control" id="name" required v-model="category.name" name="name" />
            </div>

            <!-- <div class="form-group">
              <label for="amount">Precio</label>
              <input class="form-control" id="amount" required v-model="category.amount" name="amount" />
            </div> -->

            <!-- <div class="form-group">
              <label for="category_id">ID de Categoria</label>
              <input class="form-control" id="category_id" required v-model="category.category_id" name="category_id" />
            </div> -->
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <!-- default footer -->
            <button @click="saveCategory" class="btn btn-success">Ok</button>
          </slot>
        </div>
      </div>
      <div v-else>
      <h4>Categoria guardado con exito!</h4>
      <button class="btn btn-success" @click="newCategory">Nuevo</button>
      
      </div>
      </div>
    </div>
  </Transition>
</template>
  
<script>
import CategoryDataService from "@/services/CategoryDataService";

export default {
  name: "AbmCategoryView",
  props: ['action', 'CategoryId'],
  data() {
    return {
      category: {
        id: null,
        name: "",
      
      },
      submitted: false,
      header: ''
    };
  },
  methods: {
    getCategory(id) {
      CategoryDataService.get(id)
        .then(response => {
          this.category = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    saveCategory() {
      if (this.action == 'create') {
        var data = {
          name: this.category.name,
        };

        CategoryDataService.create(data)
          .then(response => {
            this.category.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      }
      if (this.action == 'edit') {
        this.updateCategory()
      }
      if (this.action == 'delete') {
        this.deleteCategory()
      }
    },

    deleteCategory() {
      CategoryDataService.delete(this.category.id)
        .then(response => {
          console.log(response.data);
          this.message = 'Categoria eliminado con exito';
          this.closeAbm()
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCategory() {
      CategoryDataService.update(this.category.id, this.category)
        .then(response => {
          console.log(response.data);
          this.message = 'Categoria actualizado con exito';
          this.closeAbm()
        })
        .catch(e => {
          console.log(e);
        });
    },

    newCategory() {
      this.submitted = false;
      this.category = {};
    },

    abm() {
      if (this.action != 'create') {
        console.log(this.action, this.CategoryId)
        this.getCategory(this.CategoryId)
      }
      switch (this.action) {
        case 'create': this.header = 'Ingresar categoria'
        break
        case 'edit': this.header = 'Editar categoria'
        break
        case 'delete': this.header = '¿Esta seguro de eliminar esta categoria?'
        break
      }
    },

    closeAbm() {
      this.$emit('cerrar')
    }
  },
  mounted() {
    this.abm()
  }
};
</script>
  
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>