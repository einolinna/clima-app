class Busquedas {


    historial = ['Buenos Aires,Madrid,San José'];

    constructor(){
    //TODO: Leer DB si existe.

    }

    get paramsMapBox(){

            return {

                "access_token":"pk.eyJ1IjoibjN0dGluZyIsImEiOiJja3F5ODkyYnQxNXF4MnZxaGQ0c3A3anpqIn0.IIUIwLdz7QN7FWVpqWVjzg",
                "limit":5,
                "language":"es"


            }



    }
    async ciudad(lugar= ""){
          //Peticion http
        const axios = require('axios').default;
        //const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/madrid%20.json?access_token=pk.eyJ1IjoibjN0dGluZyIsImEiOiJja3F5ODkyYnQxNXF4MnZxaGQ0c3A3anpqIn0.IIUIwLdz7QN7FWVpqWVjzg&cachebuster=1625949664845&autocomplete=true&limit=5&language=es");
       try {

        const instance = axios.create({

            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            params: this.paramsMapBox
        });
        const resp = await instance.get();
        console.log(resp.data);
        return []
        /* console.log('ciudad',lugar); */
       } catch (error) {
        return [];
       }
        //Peticion http

            
    }

}

module.exports = Busquedas;