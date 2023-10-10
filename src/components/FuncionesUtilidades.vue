

<script>

import axios from "axios"
export default {
  name: 'FuncionesUtilidades',
  methods: {
    async getData(endpoint,idbusqueda) {

        if (idbusqueda == undefined) {
            idbusqueda = ""
        }
        var url = "http://localhost/danzar_api/public/"
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
  },
  
}


</script>