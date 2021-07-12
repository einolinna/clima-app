require('dotenv').config()

const { leerImput, inquirerMenu, pausa,listadoLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('process');


require('colors')
const main = async()=>{
    
    
    do {
        const busquedas = new Busquedas();
        opt = await inquirerMenu();
        console.clear();
        switch (opt) {
            
            case 1:
                //Mostrar mensaje
                const termino = await leerImput('Ciudad: ');
                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                //Seleccionar lugares               
                const id= await listadoLugares(lugares);
                const lugarSeleccionado = lugares.find(l => l.id === id);

                //Clima

                const clima = await busquedas.climaLugar(lugarSeleccionado.lat,lugarSeleccionado.lng)
                console.log(clima);
            //Mostrar mensaje y mostrar ciudad, mostrar clima
               console.clear();
               console.log('\nInformación de la ciudad\n'.green);
               console.log('Ciudad: ', lugarSeleccionado.nombre);
               console.log('Lat: ', lugarSeleccionado.lat);
               console.log('Lng: ', lugarSeleccionado.lng);
               console.log('Nubosidad: ',clima.desc.green);
               console.log('Temperatura actual: ',` ${parseInt(clima.temp)}°`.green);
               console.log('Maxima: ', ` ${parseInt(clima.temp_max)}°`.yellow);
               console.log('Minima: ' , ` ${parseInt(clima.temp_min)}°`.yellow);
            break;
            case 2:
                
                break;

                case 0:
                
                    break;
    
        }


       if(opt !== 0) await pausa();
    } while (opt !== 0);


    const busquedas = new Busquedas();

}

main();