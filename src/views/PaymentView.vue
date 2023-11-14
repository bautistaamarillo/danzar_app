<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Busqueda por id"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Buscar
          </button>
        </div>
      </div>
  
  <button
    type="button"
    class="btn btn-primary"
    @click="Abm('create', PaymentId)"
  >
    Añadir
  </button>

  

          <div v-if="visible_payment === true">
          <AbmPayment
            :action = action
            :PaymentId = PaymentId
            v-on:cerrar="close()"
          />
          </div>

        
    </div>
    <div class="col-md-6">
      <h4>Listado de payments</h4>
      <ul class="list-group">
        <li class="list-group-payment"
          :class="{ active: index == currentIndex }"
          v-for="(payment, index) in filteredPayments"
          :key="index"
          @click="setActivePayment(payment, index)"
        >
          {{ payment.id }}
          
        <button
          class="btn btn-outline-warning"
          @click = "Abm('edit', payment.id)"
        >
          Editar
        </button>
        <button
          class="btn btn-outline-danger"
          @click = "Abm('delete', payment.id)"
        >
          Eliminar
        </button>

        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentPayment">
        <h4>Payment</h4>
        <div>
          <label><strong>ID</strong></label> {{ currentPayment.student_id }}
        </div>
        <div>
          <label><strong>Fecha:</strong></label> {{ currentPayment.date }}
        </div>
        <div>
          <label><strong>Numero de Factura:</strong></label> {{ currentPayment.invoice_number }}
        </div>
      </div>
      <div v-else>
        <br/>
        <p>Por favor seleccione un Payment...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentDataService from "@/services/PaymentDataService";
import AbmPayment from "@/components/ABM/AbmPayment.vue"

export default {
  name: "payments-list",
  data() {
    return {
      payments: [],
      currentPayment: null,
      currentIndex: -1,
      name: "",
      filteredPayments: [],
      visible_payment: false,
      action: '',
    };
  },
  components: {
  AbmPayment
},
  methods: {
    retrievePayments() {
      PaymentDataService.getAll()
        .then(response => {
          this.payments = response.data;
          this.searchName();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePayments();
      this.currentPayment = null;
      this.currentIndex = -1;
    },

    setActivePayment(payment, index) {
      this.currentPayment = payment;
      this.currentIndex = payment ? index : -1;
    },
    
    searchName() {
      this.filteredPayments = this.payments.filter((payment) => payment.name.includes(this.name))
      this.setActivePayment(null);
    },

    Abm(action, PaymentId) {
      this.action = action
      this.PaymentId = PaymentId
      this.visible_payment = !this.visible_payment
      console.log(action, PaymentId, this.visible_payment)
    },

    close() {
      this.visible_payment = false
    }
  },
  mounted() {
    this.retrievePayments();
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