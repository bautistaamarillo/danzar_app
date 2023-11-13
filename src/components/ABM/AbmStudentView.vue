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
          <div>
          <slot name="body">
            <div class="form-group">
              <label for="name">Nombre</label>
              <input type="text" class="form-control" id="name" required v-model="student.name" name="name" />
            </div>

            <div class="form-group">
              <label for="last_name">Apellido</label>
              <input class="form-control" id="last_name" required v-model="student.last_name" name="last_name" />
            </div>
            <div class="form-group">
              <label for="address">Direccion</label>
              <input class="form-control" id="address" required v-model="student.address" name="address" />
            </div>
            <div class="form-group">
              <label for="dni">DNI</label>
              <input class="form-control" id="dni" required v-model="student.dni" name="dni" />
            </div>
            <div class="form-group">
              <label for="phone_number">Numero</label>
              <input class="form-control" id="phone_number" required v-model="student.phone_numer" name="phone_number" />
            </div>
            <div class="form-group">
              <label for="birthdate">Fecha de nacimiento</label>
              <input class="form-control" id="birthdate" required v-model="student.birthdate" name="birthdate" />
            </div>
            <div class="form-group">
              <label for="observations">Observaciones</label>
              <input class="form-control" id="observations" required v-model="student.observations" name="observations" />
            </div>

            <div v-for="item in items" :value="item.id" :key="item.id">
                  {{ item.name }} <input type="checkbox" value={{item.seleccion}}>  
                  <div v-if="item.seleccion === true"> 
                  
                  </div>
                </div>

          </slot>
          </div>
          
          
            
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <!-- default footer -->
            <button @click="saveStudent" class="btn btn-success">Ok</button>
          </slot>
        </div>
      </div>
      <div v-else>
      <h4>Estudiante guardado con exito!</h4>
      <button class="btn btn-success" @click="newStudent">Nuevo</button>
      </div>
      </div>
    </div>
  </Transition>
</template>
  
<script>
import StudentDataService from "@/services/StudentDataService";
import ItemDataService from "@/services/ItemDataService";

export default {
  name: "AbmStudentView",
  props: ['action', 'StudentId'],
  data() {
    return {
      student: {
        id: null,
        name: "",
        last_name: "",
        address: "",
        dni: "",
        phone_number: "",
        birthdate: "",
        observations: "",
        itemstudents: [{iditem:null}],
      },
      items: [],
      submitted: false,
      header: ''
    };
  },
  methods: {
    getStudent(id) {
      StudentDataService.get(id)
        .then(response => {
          this.student = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
      },
      getItems() {
      ItemDataService.getAll()
        .then(response => {
          this.items = response.data;
          console.log(response.data);
          var i = 0;
          for(i = 0; i<this.items.length;i++){
            this.items[i].seleccion
          }
        })


        .catch(e => {
          console.log(e);
        });
    },

    

    saveStudent() {
      if (this.action == 'create') {
        var data = {
          name: this.student.name,
          last_name: this.student.last_name,
          address: this.student.address,
          dni: this.student.dni,
          phone_number: this.student.phone_number,
          birthdate: this.student.birthdate,
          observations: this.student.observations,
          studentitems: this.items.filter(E => E.seleccion)
        };

        StudentDataService.create(data)
          .then(response => {
            this.student.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      }
      if (this.action == 'edit') {
        this.updateStudent()
      }
      if (this.action == 'delete') {
        this.deleteStudent()
      }
    },

    deleteStudent() {
      StudentDataService.delete(this.student.id)
        .then(response => {
          console.log(response.data);
          this.message = 'Estudiante eliminado con exito';
          this.closeAbm()
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateStudent() {
      StudentDataService.update(this.student.id, this.student)
        .then(response => {
          console.log(response.data);
          this.message = 'Estudiante actualizado con exito';
          this.closeAbm()
        })
        .catch(e => {
          console.log(e);
        });
    },

    newStudent() {
      this.submitted = false;
      this.student = {};
    },

    abm() {
      if (this.action != 'create') {
        console.log(this.action, this.StudentId)
        this.getStudent(this.StudentId)
      }
      switch (this.action) {
        case 'create': this.header = 'Ingresar Estudiante'
        break
        case 'edit': this.header = 'Editar Estudiante'
        break
        case 'delete': this.header = '¿Esta seguro de eliminar este estudiante?'
        break
      }
    },

    closeAbm() {
      this.$emit('cerrar')
    }
  },
  mounted() {
    this.abm(),
    this.getItems()
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