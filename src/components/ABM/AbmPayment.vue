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
                <label for="amount">Id Estudiante</label>
                <input class="form-control" id="amount" required v-model="payment.student_id" name="student_id" />
              </div>
  
              <div class="form-group">
                <label for="category_id">Fecha</label>
                <input class="form-control" id="category_id" required v-model="payment.date" name="date" />
              </div>
              <div class="form-group">
                <label for="amount">Numero de Factura</label>
                <input class="form-control" id="amount" required v-model="payment.invoice_number" name="invoice_number" />
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
  import PaymentDataService from "@/services/PaymentDataService";
  
  export default {
    name: "AbmPayment",
    props: ['action', 'PaymentId'],
    data() {
      return {
        payment: {
          id: null,
          student_id: "",
          date: "",
          number: ""
        },
        submitted: false,
        header: ''
      };
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
  
      savePayment() {
        if (this.action == 'create') {
          var data = {
      
            student_id: this.payment.student_id,
            date: this.payment.date,
            inovice_number: this.payment.invoice_number
          
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