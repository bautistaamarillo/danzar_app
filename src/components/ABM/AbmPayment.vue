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
                <label for="student">Estudiante</label>
                <select class="form-control" id="student" required v-model="payment.student_id" name="student_id"  >
                  <option disabled value="">Seleccione un estudiante</option>
                  <option v-for="student in students" :value="student.id" :key="student.id" >
                    {{ student.name + ' ' + student.last_name}} 
                  </option>       
                </select>
               <div v-show="payment.student_id != ''">
                <div v-for="(item, i) in items" :key="i">
                  <li hidden>  {{n = 0}}</li>
                  <div v-for="(cadaItem, n) in itemstudents" :key="n">
                     <div v-if="item.name === cadaItem.name">
                      {{ cadaItem.name }}<input type="checkbox" v-model="estadoCheckbox" value="cadaItem.id">
                    </div>
                      
                      <li hidden>  {{n = itemstudents}}</li>
                    </div>
                    {{ item.name }}<input type="checkbox" >
                    </div>
                    
                    </div>
                 
                    
              
              </div>
            
         
              <div class="form-group">
                <label for="date">Fecha</label>
                <input type="date" class="form-control" id="date" required v-model="payment.date" name="date" />
              </div>
              <div class="form-group">
                <label for="number">Numero de Factura</label>
                <input class="form-control" id="number" required v-model="payment.number" name="number" />
              </div>
              
              <div class="form-group">
                <label for="amount">Monto total</label>
                <input class="form-control" id="amount" required v-model="payment.amount" name="amount" />
              </div>

            </slot>
          </div>
  
          <div class="modal-footer">
            <slot name="footer">
              <!-- default footer -->
              <button @click="savePayment" class="btn btn-success">Ok</button>
            </slot>
          </div>
        </div>
        <div v-else>
        <h4>Payment guardado con exito!</h4>
        <button class="btn btn-success" @click="newPayment">Nuevo</button>
        </div>
        </div>
      </div>
    </Transition>
  </template>
    
  <script>
  import axios from "axios";
  import PaymentDataService from "@/services/PaymentDataService";
  import StudentDataService from "@/services/StudentDataService";
  import ItemDataService from "@/services/ItemDataService";
  
  export default {
    name: "AbmPayment",
    props: ['action', 'PaymentId'],
    data() {
      return {
        payment: {
          id: null,
          student_id: "",
          date: "",
          amount: ""

        },
        itemstudents:[],
        students: [],
        submitted: false,
        header: '',
        items:[],
        estadoCheckbox: true 
         };
    },
    created(){
      this.$watch("payment.student_id", this.observedId);
    },
    methods: {
      getPayment(id) {
        PaymentDataService.get(id)
          .then(response => {
            this.payment = response.data[0];
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      getItems() {
      ItemDataService.getAll()
        .then(response => {
          console.log(response.data);
          this.items = response.data;
          var i = 0;
          for(i = 0; i<this.items.length;i++){
            this.items[i].seleccion = false;
          }
        })


        .catch(e => {
          console.log(e);
        });
    },

      retrieveStudents() {
      StudentDataService.getAll()
        .then(response => {
          this.students = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveItems() {
     ItemDataService.getAll()
        .then(response => {
          this.items = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  
      savePayment() {
        if (this.action == 'create') {
          var data = {
      
            student_id: this.payment.student_id,
            date: this.payment.date,
            number: this.payment.number,
            amount: this.payment.amount
          
          };
  
          PaymentDataService.create(data)
            .then(response => {
              this.payment.id = response.data.id;
              console.log(response.data);
              this.submitted = true;
            })
            .catch(e => {
              console.log(e);
            });
        }
        if (this.action == 'edit') {
          this.updatePayment()
        }
        if (this.action == 'delete') {
          this.deletePayment()
        }
      },
  
      deletePayment() {
        PaymentDataService.delete(this.payment.id)
          .then(response => {
            console.log(response.data);
            this.message = 'payment eliminado con exito';
            this.closeAbm()
          })
          .catch(e => {
            console.log(e);
          });
      },
  observedId(newId , oldId){
   if (newId !== oldId){
    axios
    .get("http://localhost/danzar_api/public/students/" + newId)
    .then((response) => {
      console.log(response.data);
      this.itemstudents = response.data;
    })
    .catch(e => {
            console.log(e);
          });
   }
  },
      updatePayment() {
        PaymentDataService.update(this.payment.id, this.payment)
          .then(response => {
            console.log(response.data);
            this.message = 'Payment actualizado con exito';
            this.closeAbm()
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      newPayment() {
        this.submitted = false;
        this.payment = {};
      },
  
      abm() {
        if (this.action != 'create') {
          console.log(this.action, this.PaymentId)
          this.getPayment(this.PaymentId)
        }
        switch (this.action) {
          case 'create': this.header = 'Ingresar payment'
          break
          case 'edit': this.header = 'Editar payment'
          break
          case 'delete': this.header = '¿Esta seguro de eliminar este payment?'
          break
        }
      },
  
      closeAbm() {
        this.$emit('cerrar')
      }
    },
    mounted() {
      this.abm();
      this.retrieveStudents();
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