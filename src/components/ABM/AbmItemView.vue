<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div v-if="!submitted">
          <button type="button" class="btn-close" @click="closeAbm()" aria-label="Close"></button>
          <div class="modal-header">
            <slot name="header">{{ header }}</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" class="form-control" id="name" required v-model="item.name" name="name" />
              </div>

              <div class="form-group">
                <label for="amount">Precio</label>
                <input class="form-control" id="amount" required v-model="item.amount" name="amount" />
              </div>

              <div class="form-group">
                <label for="category_id">Categoria</label>
                <select class="form-control"
                id="category_id" required v-model="item.category_id" name="category_id" >
                <option disabled value="">Seleccione una categoria</option>
                <option v-for="category in categories" :value="category.id" :key="category.id">
                  {{ category.name }}
                </option>
                </select>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              ¿Guardar?
              <button @click="saveItem" class="btn btn-success">Ok</button>
            </slot>
          </div>
        </div>
        <div v-else>
          <button type="button" class="btn-close" @click="closeAbm()" aria-label="Close"></button>
          <h4>Item guardado con exito!</h4>
          <button class="btn btn-success" @click="newItem">Nuevo</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
  
<script>
import ItemDataService from "@/services/ItemDataService";
import CategoryDataService from "@/services/CategoryDataService";

export default {
  name: "AbmItemView",
  props: ['action', 'ItemId'],
  data() {
    return {
      item: {
        id: null,
        name: "",
        amount: "",
        category_id: ""
      },
      categories: [],
      submitted: false,
      header: ''
    };
  },
  methods: {
    getItem(id) {
      ItemDataService.get(id)
        .then(response => {
          this.item = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveCategories() {
      CategoryDataService.getAll()
        .then(response => {
          this.categories = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    saveItem() {
      if (this.action == 'create') {
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
      }
      if (this.action == 'edit') {
        this.updateItem()
      }
      if (this.action == 'delete') {
        this.deleteItem()
      }
    },

    deleteItem() {
      ItemDataService.delete(this.item.id)
        .then(response => {
          console.log(response.data);
          this.message = 'Item eliminado con exito';
          this.closeAbm()
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateItem() {
      ItemDataService.update(this.item.id, this.item)
        .then(response => {
          console.log(response.data);
          this.message = 'Item actualizado con exito';
          this.closeAbm()
        })
        .catch(e => {
          console.log(e);
        });
    },

    newItem() {
      this.submitted = false;
      this.item = {};
    },

    abm() {
      if (this.action != 'create') {
        console.log(this.action, this.ItemId)
        this.getItem(this.ItemId)
      }
      switch (this.action) {
        case 'create': this.header = 'Ingresar item'
          break
        case 'edit': this.header = 'Editar item'
          break
        case 'delete': this.header = '¿Esta seguro de eliminar este item?'
          break
      }
    },

    closeAbm() {
      this.$emit('cerrar')
    }
  },
  mounted() {
    this.abm();
    this.retrieveCategories();
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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