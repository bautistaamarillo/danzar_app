

<script>

const url = "http://localhost/danzar_api/public/";
import axios from "axios"
export default {
  name: 'FuncionesUtilidades',
  methods: {
    async getData(endpoint,idbusqueda) {
        if (idbusqueda == undefined) {
            idbusqueda = ""
        }
        console.log(url+endpoint+"/"+idbusqueda)
    axios
      .get(url+endpoint+"/"+idbusqueda)
      .then((response) => {
        // Mostramos los datos obtenidos en la consola
        console.log(response)
        this.students = response.data
      })
      .catch(function (error) {
        // Si hubo algun error mostramos algo
        console.log(error)
      })
    },


    async editData(endpoint,idedit){
      axios
      .put(url+endpoint+"/"+idedit)
      .then((response) => {
        console.log(response)
        this.resultados = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    // async destroyData(endpoint,idedit){
    //   axios
    //   .delete(url+endpoint+"/"+idedit)
    //   .then((response) => {
    //     console.log("se ha eliminado correctamente.")
    //     this.resultados = response.data //me falta borrar los datos
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })
    // },
    


  },
  
}


</script>