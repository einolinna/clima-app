const { default: axios } = require('axios');

class Busquedas {


    historial = ['Buenos Aires,Madrid,San José'];

    constructor(){
    //TODO: Leer DB si existe.

    }

    get paramsMapBox(){

            return {

                "access_token":process.env.MAPBOX_KEY,
                "limit":5,
                "language":"es"


            }



    };

    get paramsOpenWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units:'metric',
            lang:'es'
        }
    };
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
        return resp.data.features.map( lugar => ({

                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
        }));
        
       } catch (error) {
        return [];
       }
        //Peticion http

            
    }

    async climaLugar(lat, lon) {
        try {
            const instance = axios.create({
                    baseURL:'https://api.openweathermap.org/data/2.5/weather',
                    params: {...this.paramsOpenWeather,lat,lon}
                    

            });
            const resp = await instance.get();
            const {weather,main} = resp.data;

            return{

                desc: weather[0].description,
                temp: main.temp,
                temp_max: main.temp_max,
                temp_min: main.temp_min
        };



        } catch (error) {
            console.log(error);
        }



    }

}

module.exports = Busquedas;