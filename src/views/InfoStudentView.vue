<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Busqueda por nombre"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Buscar
          </button>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-primary"
        @click="Abm('create', StudentId)"
      >
        Añadir
      </button>

      <div v-if="visible_student === true">
        <AbmStudentView :action="action" :StudentId="StudentId" v-on:cerrar="close()" />
      </div>
    </div>

    <div class="col-md-6">
      <h4>Listado de estudiantes</h4>
      <ul class="list-group">
        <li
          class="list-group-student"
          :class="{ active: index == currentIndex }"
          v-for="(student, index) in filteredStudents"
          :key="index"
          @click="setActiveStudent(student, index)"
        >
          {{ student.name }}

          <button class="btn btn-outline-warning" @click="Abm('edit', student.id)">
            Editar
          </button>
          <button
            class="btn btn-outline-danger"
            @click="Abm('delete', student.id)"
          >
            Eliminar
          </button>
        </li>
      </ul>
    </div>




    
    <!-- <div class="col-md-6">
      <div v-if="currentStudent">
        <h4>Student</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentStudent.name }}
        </div>
        <div>
          <label><strong>Apellido:</strong></label> {{ currentStudent.lastname }}
        </div>
        <div>
          <label><strong>Direccion:</strong></label> {{ currentStudent.address }}
        </div>
        <div>
          <label><strong>DNI:</strong></label> {{ currentStudent.dni }}
        </div>
        <div>
          <label><strong>Numero:</strong></label> {{ currentStudent.phone_number }}
        </div>
        <div>
          <label><strong>Observaciones:</strong></label> {{ currentStudent.observations }}
        </div>
        <div>
          <label><strong>Fecha de nacimiento:</strong></label> {{ currentStudent.birthdate }}
        </div>
        
       
      </div>
      <div v-else>
        <br />
        <p>Por favor seleccione un Estudiante...</p>
      </div>
    </div> -->
  </div>
</template>

<script>
import StudentDataService from "@/services/StudentDataService";
import AbmStudentView from "@/components/ABM/AbmStudentView.vue";

export default {
  name: "students-list",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      name: "",
      lastname: "",
      address: "",
      dni: "",
      phone_number: "",
      observations: "",
      birthdate: "",
      filteredStudents: [],
      visible_student: false,
      action: "",
    };
  },
  components: {
    AbmStudentView,
  },
  methods: {
    retrieveStudents() {
      StudentDataService.getAll()
        .then((response) => {
          this.students = response.data;
          this.searchName();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStudents();
      this.currentStudent = null;
      this.currentIndex = -1;
    },

    setActiveStudent(student, index) {
      this.currentStudent = student;
      this.currentIndex = student ? index : -1;
    },

    searchName() {
      this.filteredStudents = this.students.filter((student) =>
        student.name.includes(this.name)
      );
      this.setActiveStudent(null);
    },

    Abm(action, StudentId) {
      this.action = action;
      this.StudentId = StudentId;
      this.visible_student = !this.visible_student;
      console.log(action, StudentId, this.visible_student);
    },

    close() {
      this.visible_student = false;
    },
  },
  mounted() {
    this.retrieveStudents();
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